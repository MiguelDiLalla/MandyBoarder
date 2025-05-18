"""
VidToGif.py
-------------
Convert a video file to a lightweight animated GIF or WebP using OpenCV and PIL.

Features:
- Interactive CLI (Rich, Colorama)
- Frame extraction, resizing, and animated image creation
- Google-style docstrings and PEP8 compliance

Author: Miguel (2025)
"""

import os
import sys
from pathlib import Path
import cv2
from PIL import Image
from rich.console import Console
from rich.panel import Panel
from rich.progress import Progress
from rich.prompt import Prompt, Confirm
from rich.table import Table
from colorama import init
import logging

# Initialize colorama and rich console
init()
console = Console()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='[%(levelname)s] %(message)s',
)

SUPPORTED_VIDEO_FORMATS = ['.mp4', '.avi', '.mov', '.mkv']


def get_video_file() -> Path:
    """Prompt the user to input a video file path and validate it.

    Returns:
        Path: Path to the video file.
    """
    while True:
        file_path = Prompt.ask(
            "[bold blue]Enter the path to the video file",
            default="Video/VID_20250518_233555.mp4"
        )
        path = Path(file_path)
        if path.is_file() and path.suffix.lower() in SUPPORTED_VIDEO_FORMATS:
            return path
        console.print(f"[red]File not found or unsupported format: {file_path}[/red]")


def count_frames(video_path: Path) -> int:
    """Count the number of frames in a video file.

    Args:
        video_path (Path): Path to the video file.

    Returns:
        int: Total number of frames.
    """
    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        raise ValueError(f"Cannot open video: {video_path}")
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    cap.release()
    return total


def extract_frames(video_path: Path, num_frames: int, resize_pct: int) -> list:
    """Extract and resize frames from a video.

    Args:
        video_path (Path): Path to the video file.
        num_frames (int): Number of frames to extract.
        resize_pct (int): Resize percentage (100 = original size).

    Returns:
        list: List of PIL.Image frames.
    """
    cap = cv2.VideoCapture(str(video_path))
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_indices = [int(i * total_frames / num_frames) for i in range(num_frames)]
    frames = []
    idx = 0
    with Progress() as progress:
        task = progress.add_task("[cyan]Extracting frames...", total=num_frames)
        for i in range(total_frames):
            ret, frame = cap.read()
            if not ret:
                break
            if i == frame_indices[idx]:
                img = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                pil_img = Image.fromarray(img)
                if resize_pct != 100:
                    w, h = pil_img.size
                    pil_img = pil_img.resize(
                        (int(w * resize_pct / 100), int(h * resize_pct / 100)),
                        Image.LANCZOS
                    )
                frames.append(pil_img)
                idx += 1
                progress.update(task, advance=1)
                if idx >= num_frames:
                    break
    cap.release()
    return frames


def save_animated(frames: list, out_path: Path, fmt: str, duration: float, loop: int = 0):
    """Save frames as an animated GIF or WebP.

    Args:
        frames (list): List of PIL.Image frames.
        out_path (Path): Output file path.
        fmt (str): 'gif' or 'webp'.
        duration (float): Total duration in seconds (for GIF) or min frame duration (WebP).
        loop (int): Number of animation loops (0 = infinite).
    """
    if fmt == 'gif':
        frame_duration = max(1, int(duration * 1000 / len(frames)))
        frames[0].save(
            out_path,
            save_all=True,
            append_images=frames[1:],
            duration=frame_duration,
            loop=loop,
            optimize=True,
            disposal=2
        )
    elif fmt == 'webp':
        # WebP: duration is per-frame (ms), use minimum (20ms)
        frame_duration = 20
        frames[0].save(
            out_path,
            save_all=True,
            append_images=frames[1:],
            duration=frame_duration,
            loop=loop,
            format='WEBP',
            quality=80,
            method=6
        )
    else:
        raise ValueError(f"Unsupported format: {fmt}")


def format_size(size_bytes: int) -> str:
    """Format size in bytes to a human-readable string.

    Args:
        size_bytes (int): Size in bytes.

    Returns:
        str: Formatted size string.
    """
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_bytes < 1024 or unit == 'GB':
            return f"{size_bytes:.2f} {unit}"
        size_bytes /= 1024


def main():
    """Main function for interactive video to GIF/WebP conversion.

    Preserves original video duration, lets user select a low frame count
    for small file size. Frame durations are set so the animation matches
    the original video duration.
    """
    console.print(Panel.fit(
        "[bold yellow]Video to Animated GIF/WebP Converter[/bold yellow]\n"
        "[cyan]Convert a video to a lightweight animated image.[/cyan]",
        border_style="yellow"
    ))
    try:
        video_path = get_video_file()
        cap = cv2.VideoCapture(str(video_path))
        if not cap.isOpened():
            raise ValueError(f"Cannot open video: {video_path}")
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        fps = cap.get(cv2.CAP_PROP_FPS)
        video_duration = total_frames / fps if fps > 0 else 0
        cap.release()
        console.print(f"[green]Total frames:[/green] {total_frames}")
        console.print(f"[green]Video duration:[/green] {video_duration:.2f} s @ {fps:.2f} fps")
        # Suggest a low frame count for small file size
        min_frames = 2
        max_frames = min(30, total_frames)
        num_frames = int(Prompt.ask(
            f"[bold blue]How many frames to use? (preserves duration)",
            default=str(max_frames),
            choices=[str(i) for i in range(min_frames, max_frames+1)]
        ))
        resize_pct = int(Prompt.ask(
            "[bold blue]Resize percentage (100 = original size)",
            default="100",
            choices=[str(i) for i in range(10, 110, 10)]
        ))
        fmt = Prompt.ask(
            "[bold blue]Output format",
            choices=["gif", "webp"],
            default="gif"
        )
        # Calculate per-frame duration to preserve original video duration
        frame_duration = video_duration / num_frames if num_frames > 0 else 0
        frame_duration_ms = frame_duration * 1000
        console.print(f"[yellow]Output will have {num_frames} frames over {video_duration:.2f} s "
                      f"({frame_duration_ms:.0f} ms per frame).[/yellow]")
        # Ask if user wants to create a loop (append reversed frames)
        loop_anim = Confirm.ask(
            "[bold blue]Make animation loop (append reversed frames for boomerang effect)?",
            default=False
        )
        out_path = video_path.with_suffix(f'.{fmt}')
        frames = extract_frames(video_path, num_frames, resize_pct)
        if loop_anim:
            # Append reversed frames (excluding last to avoid duplicate frame)
            frames = frames + list(reversed(frames[1:-1] if len(frames) > 2 else frames))
            # Double the duration
            save_animated(frames, out_path, fmt, video_duration * 2, loop=0)
        else:
            reversed_anim = Confirm.ask(
                "[bold blue]Reverse the animation (playback backwards)?",
                default=False
            )
            if reversed_anim:
                frames = list(reversed(frames))
            save_animated(frames, out_path, fmt, video_duration, loop=0)
        orig_size = os.path.getsize(video_path)
        out_size = os.path.getsize(out_path)
        table = Table(title="Conversion Result")
        table.add_column("File", style="cyan")
        table.add_column("Size", style="green", justify="right")
        table.add_row(str(video_path.name), format_size(orig_size))
        table.add_row(str(out_path.name), format_size(out_size))
        table.add_row("Saved", format_size(orig_size - out_size))
        console.print(table)
        console.print("[bold green]Done! Your animated image is ready.[/bold green]")
    except KeyboardInterrupt:
        console.print("\n[yellow]Operation cancelled by user.[/yellow]")
    except Exception as e:
        logging.exception(e)
        console.print(f"[bold red]Error:[/bold red] {e}")
        return 1
    return 0

if __name__ == "__main__":
    sys.exit(main())

# ---
# Tips:
# - Use 'black' and 'flake8' for formatting and linting: black VidToGif.py && flake8 VidToGif.py
# - For best results, keep frame count and resize low for web use.
# - Try changing duration/resize for different effects.
#
# Exercise: Refactor extract_frames to support extracting only a specific segment (start/end seconds).
# ---
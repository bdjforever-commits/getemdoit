from pathlib import Path

from fastapi import FastAPI


BASE_DIR = Path(__file__).resolve().parent.parent
DIRECTORIES = [
    "core/logic",
    "core/nodes",
    "assets/designs",
    "assets/outputs",
    "config",
    "nuance_lab",
]


def initialize_enscight_workspace() -> None:
    """
    Sets up the core directory structure for Enscight by Bobbie Daii Juor.
    Designed for the 'in-cohesive cohesiveness' framework.
    """
    print("--- Initializing Enscight Workspace ---")
    for folder in DIRECTORIES:
        folder_path = BASE_DIR / folder
        if not folder_path.exists():
            folder_path.mkdir(parents=True, exist_ok=True)
            print(f"Created directory: {folder}")
        else:
            print(f"Directory already exists: {folder}")
    print("--- Workspace Ready for Robbie ---")


app = FastAPI(title="Enscight API")


@app.on_event("startup")
def on_startup() -> None:
    initialize_enscight_workspace()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "enscight-api"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("server.main:app", host="0.0.0.0", port=8000, reload=True)

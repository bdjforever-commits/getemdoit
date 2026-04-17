import os


def initialize_enscight_workspace():
    """
    Sets up the core directory structure for Enscight by Bobbie Daii Juor.
    Designed for the 'in-cohesive cohesiveness' framework.
    """
    directories = [
        "core/logic",
        "core/nodes",
        "assets/designs",
        "assets/outputs",
        "config",
        "nuance_lab",
    ]

    print("--- Initializing Enscight Workspace ---")
    for folder in directories:
        if not os.path.exists(folder):
            os.makedirs(folder)
            print(f"Created directory: {folder}")
        else:
            print(f"Directory already exists: {folder}")
    print("--- Workspace Ready for Robbie ---")


if __name__ == "__main__":
    initialize_enscight_workspace()
    print("\nEnscight is online. Ready to build the future of design.")

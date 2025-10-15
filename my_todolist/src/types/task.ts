export interface SubTask {
    _id: string;
    text: string;
    done: boolean;
}

export interface Task {
    _id: string;
    user: string;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    start: Date | null;
    end: Date | null;
    subtasks: SubTask[];
    // ...các trường khác nếu có
}

export interface TaskPayload {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    start: Date | null;
    end: Date | null;
    subtasks?: SubTask[];
}
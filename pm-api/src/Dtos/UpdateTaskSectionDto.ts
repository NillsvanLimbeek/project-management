import { Task } from '@models/Task';

export interface UpdateTaskSectionDto {
    id: number;
    title: string;
    tasks: Task[];
}
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ITaskService } from './ITaskService';

import { Task } from '@/Models/Task';

@Injectable()
export class TasksService implements ITaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async FindAll(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async Find(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne(id);

        if (!task) {
            throw new HttpException('Task does not exist...', 404);
        }

        return task;
    }

    async Create(task: Task): Promise<Task> {
        try {
            return await this.taskRepository.save(task);
        } catch (e) {
            throw new HttpException(e, 404);
        }
    }

    async Update(id: number, task: Task): Promise<Task> {
        try {
            await this.taskRepository.update(id, task);

            return task;
        } catch (e) {
            throw new HttpException(e, 404);
        }
    }

    async Delete(id: number): Promise<Task> {
        try {
            const taskToDelete = this.taskRepository.findOne(id);
            await this.taskRepository.delete(id);

            return taskToDelete;
        } catch (e) {
            throw new HttpException(e, 404);
        }
    }
}
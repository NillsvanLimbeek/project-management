import { ITask } from '@models/task';
import { SortType } from '@type/index';

export function sortTasks(arr: ITask[], type: SortType): ITask[] {
    return arr.sort((a, b) => {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();

        if (nameA < nameB) {
            return -1;
        }

        if (nameA > nameB) {
            return 1;
        }

        return 0;
    });
}

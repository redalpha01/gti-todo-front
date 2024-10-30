import {defineStore} from "pinia";
import {$delete, $get, $patch, $post} from "@/plugins/api";

const entity = 'tasks';

export const useTasksStore = defineStore(entity, {
    state: () => ({
        tasks: [] as Task[],
        loading: false as boolean,
        showAddInput: false as boolean,
        foo: null as any,
        bar: null as any,
        foobar: null as any,
    }),
    actions: {
        async index(): Promise<void> {
            this.loading = true;

            await $get(entity, {}, ({data}: { data: Task[] }) => {
                this.tasks = data;

            }).then(() => {
                this.loading = false;
            });
        },
        async store(data: { description: string }): Promise<void> {
            this.loading = true;

            await $post(entity, data, ({data}: {data: Task}) => {
                // Ajoute une tâche à la liste
                // En théorie, ce serait toujour la dernière tâche.
                this.tasks.push(data);

            }).then(() => {
                this.loading = false;
            });
        },
        async update(id: number, data: Partial<Task>): Promise<void> {
            this.loading = true;

            await $patch(`${entity}/${id}`, data, ({task}) => {
                // On met à jour dans la liste en replaçant la tache qu'on vient de modifier
                this.tasks.splice(this.tasks.findIndex(function (taskInList) {
                    return taskInList.id === task.id;
                }), 1, task);

            }).then(() => {
                this.loading = false;
            });
        },
        async delete(id: number): Promise<void> {
            this.loading = true;

            await $delete(`${entity}/${id}`, () => {
                // On met à jour dans la liste en replaçant la tache qu'on vient de modifier
                this.tasks.splice(this.tasks.findIndex(function (taskInList) {

                    return taskInList.id === id;
                }), 1);

            }).then(() => {
                this.loading = false;
            });
        },
    }
})
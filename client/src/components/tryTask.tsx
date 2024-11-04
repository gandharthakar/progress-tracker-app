import { useEffect, useState } from "react"
// import { useGlobalCheckboxStore } from "@/zustand/store";

interface SelectedValues {
    task_id: string,
    tasks: string[]
}

interface Labels {
    label_id: string,
    label_text: string,
    label_value: string
}

interface Props {
    user_id: string,
    workspace_id: string,
    section_id: string,
    task_id: string,
    task_title: string,
    labels: Labels[],
}

const TryTask = (props: Props) => {

    const {
        user_id,
        workspace_id,
        section_id,
        task_id,
        task_title,
        labels,
    } = props;

    const [sel, setSel] = useState<string[]>([]);
    // const { incrementCount, decrementCount } = useGlobalCheckboxStore();

    const handleCheckboxChange = (value: string) => {
        if (sel.includes(value)) {
            setSel(sel.filter((v) => v !== value));
        } else {
            setSel([...sel, value]);
        }
        console.log(sel);
    };

    const handleCheck = () => {
        const data: SelectedValues = { task_id, tasks: sel };
        console.log(data);
    }

    useEffect(() => {
        const d = {
            task_id: "task_1_2",
            tasks: ['advance', 'basic', 'intermediate']
        }
        if (task_id == d.task_id) {
            setSel(d.tasks);
        }
    }, []);

    return (
        <>
            <div className="px-[15px] py-[10px] border-b-[1px] border-solid border-zinc-500">
                {task_title}
                <input type="hidden" value={user_id + workspace_id + section_id + task_id} />
                {
                    labels.length ?
                        (
                            <div className="flex flex-wrap gap-x-[15px] gap-y-[10px]">
                                {
                                    labels.map((label) => (
                                        <label key={label.label_id}>
                                            <input
                                                type="checkbox"
                                                value={label.label_value}
                                                checked={sel.includes(label.label_value)}
                                                onChange={(e) => handleCheckboxChange(e.target.value)}
                                            />
                                            {label.label_text}
                                        </label>
                                    ))
                                }
                            </div>
                        )
                        :
                        (<div>No Labels Found.</div>)
                }
            </div>
            <button onClick={handleCheck}>Check</button>
        </>
    )
}

export default TryTask;
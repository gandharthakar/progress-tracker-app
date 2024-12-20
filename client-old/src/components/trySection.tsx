import TryTask from "./tryTask";

interface Labels {
    label_id: string,
    label_text: string,
    label_value: string
}

interface Tasks {
    task_id: string,
    task_title: string
}

interface Props {
    user_id: string,
    workspace_id: string,
    section_id: string,
    section_title: string,
    tasks: Tasks[],
    labels: Labels[]
}

const TrySection = (props: Props) => {

    const {
        user_id,
        workspace_id,
        section_id,
        section_title,
        tasks,
        labels
    } = props;

    return (
        <>
            <div className="px-[15px] py-[10px] bg-zinc-300 text-zinc-700 text-[22px] md:text-[24px]">
                {section_title}
                <input type="hidden" value={user_id + workspace_id + section_id} />
            </div>
            {
                tasks.length ?
                    (
                        <>
                            {
                                tasks.map((task) => (
                                    <TryTask
                                        key={task.task_id}
                                        user_id={user_id}
                                        workspace_id={workspace_id}
                                        section_id={section_id}
                                        task_id={task.task_id}
                                        task_title={task.task_title}
                                        labels={labels}
                                    />
                                ))
                            }
                        </>
                    )
                    :
                    ("No Tasks Found.")
            }
        </>
    )
}

export default TrySection;
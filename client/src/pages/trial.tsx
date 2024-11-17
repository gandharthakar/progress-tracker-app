import { useEffect, useState } from "react";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useGlobalCheckboxStore } from "@/zustand/store";

const calculatePercentage = (marksObtained: number, maxMarks: number): number => {
    if (maxMarks === 0) {
        throw new Error("Maximum marks cannot be zero.");
    }
    const percentage = (marksObtained / maxMarks) * 100;
    return percentage;
}

const dataDes = {
    user_id: "user_1",
    user_name: "Amit Thakur",
    workspace_id: "works_1",
    workspace_name: "Demo Workspace",
    sections: [
        {
            section_id: "1",
            section_title: "Group 1",
            tasks: [
                {
                    task_id: "task_1_1",
                    task_title: "This is Task 1 Of 1"
                },
                {
                    task_id: "task_1_2",
                    task_title: "This is Task 1 Of 2"
                },
                {
                    task_id: "task_1_3",
                    task_title: "This is Task 1 Of 3"
                }
            ]
        },
        {
            section_id: "2",
            section_title: "Group 2",
            tasks: [
                {
                    task_id: "task_2_1",
                    task_title: "This is Task 2 Of 1"
                },
                {
                    task_id: "task_2_2",
                    task_title: "This is Task 2 Of 2"
                },
                {
                    task_id: "task_2_3",
                    task_title: "This is Task 2 Of 3"
                }
            ]
        }
    ],
    labels: [
        {
            label_id: "lable_1",
            label_text: "Basic",
            label_value: "basic"
        },
        {
            label_id: "lable_2",
            label_text: "Intermediate",
            label_value: "intermediate"
        },
        {
            label_id: "lable_3",
            label_text: "Advance",
            label_value: "advance"
        }
    ]
};

const Trial = () => {

    const [checked, setChecked] = useState<number>(0);
    const [unchecked, setUnchecked] = useState<number>(100);
    const [fin, setFin] = useState<number>(0);
    const [fin2, setFin2] = useState<number>(0);
    const [piData, setPiData] = useState<any>([]);

    const { checkedCount } = useGlobalCheckboxStore();
    const { incrementCount, decrementCount } = useGlobalCheckboxStore();
    const [sel, setSel] = useState<string[]>([]);

    const handleCheckboxChange = (value: string) => {
        if (sel.includes(value)) {
            setSel(sel.filter((v) => v !== value));
            decrementCount(1);
        } else {
            setSel([...sel, value]);
            incrementCount(1)
        }
    };

    const handleCheck = () => {
        const data = { workspace_id: dataDes.workspace_id, completed_tasks: sel };
        localStorage.setItem("track_record", JSON.stringify(data));
        const arr = [];
        for (let i = 0; i < dataDes.sections.length; i++) {
            for (let x = 0; x < dataDes.sections[i].tasks.length; x++) {
                arr.push(dataDes.sections[i].tasks[x]);
            }
        }
        setUnchecked(arr.length * dataDes.labels.length);
        const fino = Number(calculatePercentage(sel.length, unchecked).toFixed(2));
        const fino2 = (100 - fino);
        setPiData([
            { id: 0, value: fino, color: '#18181b', label: "Completed" },
            { id: 1, value: fino2, color: '#3f3f46', label: "Pending" },
        ]);
    }

    useEffect(() => {
        const lsi = localStorage.getItem("track_record");
        if (lsi) {
            const prslsi = JSON.parse(lsi);
            setSel(prslsi.completed_tasks);
            prslsi.completed_tasks.forEach(() => {
                incrementCount(1);
            })
        }
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        const lsi = localStorage.getItem("track_record");
        if (lsi) {
            const prslsi = JSON.parse(lsi);
            setChecked(prslsi.completed_tasks.length);
        }
        const arr = [];
        for (let i = 0; i < dataDes.sections.length; i++) {
            for (let x = 0; x < dataDes.sections[i].tasks.length; x++) {
                arr.push(dataDes.sections[i].tasks[x]);
            }
        }
        setUnchecked(arr.length * dataDes.labels.length);
        setFin(Number(calculatePercentage(checked, unchecked).toFixed(2)));
        setFin2(100 - fin);
        setPiData([
            { id: 0, value: fin, color: '#18181b', label: "Completed" },
            { id: 1, value: fin2, color: '#3f3f46', label: "Pending" },
        ]);
        //eslint-disable-next-line
    }, [fin, fin2]);

    return (
        <>
            <div>
                <div className="pb-[10px]">
                    <h1 className="text-[24px] md:text-[26px]">
                        {dataDes.workspace_name}
                    </h1>
                </div>
                <div>
                    {
                        dataDes.sections.length ?
                            (
                                <>
                                    {
                                        dataDes.sections.map((section) => (
                                            <div key={section.section_id}>
                                                <div className="px-[15px] py-[10px] bg-zinc-300 text-zinc-700 text-[22px] md:text-[24px]">
                                                    {section.section_title}
                                                </div>
                                                {
                                                    section.tasks.length ?
                                                        (
                                                            <>
                                                                {
                                                                    section.tasks.map((task) => (
                                                                        <div key={task.task_id} className="px-[15px] py-[10px] border-b-[1px] border-solid border-zinc-500">
                                                                            {task.task_title}
                                                                            {
                                                                                dataDes.labels.length ?
                                                                                    (
                                                                                        <div className="flex flex-wrap gap-x-[15px] gap-y-[10px]">
                                                                                            {
                                                                                                dataDes.labels.map((label) => (
                                                                                                    <label htmlFor={`${label.label_value}_${task.task_id}`} key={label.label_id}>
                                                                                                        <input
                                                                                                            type="checkbox"
                                                                                                            id={`${label.label_value}_${task.task_id}`}
                                                                                                            value={`${label.label_value}_${task.task_id}`}
                                                                                                            checked={sel.includes(`${label.label_value}_${task.task_id}`)}
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
                                                                            <div className="border border-zinc-800 border-solid w-full h-[5px] mt-[5px]">
                                                                                <div className="bg-zinc-800 h-[4px] w-0" style={{ width: `${calculatePercentage(sel.filter((item) => item.includes(task.task_id)).length, dataDes.labels.length)}%` }}></div>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </>
                                                        )
                                                        :
                                                        (<div>No Tasks Found.</div>)
                                                }
                                            </div>
                                        ))
                                    }
                                </>
                            )
                            :
                            (<div>No Sections Found.</div>)
                    }
                </div>
            </div>
            <h1 className="mb-[20px] text-[26px] font-semibold">
                {checkedCount} - {unchecked}
            </h1>

            <button
                type="button"
                className="p-[10px] border border-solid border-zinc-400"
                onClick={handleCheck}
            >
                Update
            </button>

            <div className="pt-[20px]">
                <div className="text-center">
                    <div className="inline-block">
                        <PieChart
                            series={[
                                {
                                    data: piData,
                                    type: 'pie',
                                    arcLabel: (item) => `${item.value}%`,
                                    outerRadius: 120,
                                    cx: 120,
                                    startAngle: 0,
                                    highlightScope: { fade: 'global', highlight: 'item' },
                                    faded: { color: 'gray' },
                                }
                            ]}
                            width={250}
                            height={250}
                            slotProps={{
                                legend: {
                                    hidden: true,
                                }
                            }}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    fill: '#ffffff'
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Trial;
import aboutStories, { faqsContent } from "@/utils/dataFaker";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const About = () => {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-950 pt-[100px] pb-[40px] mdl-1:pt-[130px] px-[20px]">
                <div className="max-w-[900px]">
                    <div className="pb-[20px] md:pb-[30px] text-left md:text-center">
                        <h1 className="inline-block font-poppins font-bold text-[20px] md:text-[26px] text-zinc-800 dark:text-zinc-200">
                            About Us
                        </h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[30px]">
                        <div className="about-content">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima soluta dolores incidunt, dolor eum quod? Omnis dolorum enim repudiandae adipisci repellendus in quasi nesciunt blanditiis autem ut! Quam laborum tempora qui sequi sint assumenda est debitis quia cupiditate expedita maxime ea, ut numquam nulla repellat eius pariatur architecto commodi sed.
                            </p>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias aliquam iure libero reiciendis natus illo quas corrupti officiis reprehenderit mollitia consequuntur dolore nulla magni qui in, necessitatibus dolorem possimus dignissimos itaque impedit amet culpa. Rerum, cupiditate! Sequi repellat exercitationem rem ipsa? Ipsa aspernatur, iste provident necessitatibus voluptatibus nobis atque sapiente consequatur. Pariatur ipsa aliquam beatae molestiae dolores modi dolor omnis recusandae, est vitae animi. Qui provident reprehenderit, blanditiis accusamus ex soluta quod velit. Necessitatibus modi dolores omnis ut commodi a.
                            </p>
                        </div>
                        <div className="about-content">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non iure reprehenderit adipisci voluptatum, cumque esse quidem unde facilis laudantium aliquam omnis, blanditiis necessitatibus temporibus repellat itaque labore quos aut sequi sed! Quis quod accusamus impedit, similique minus quaerat deleniti reprehenderit temporibus aut porro vero aspernatur debitis eos, labore dolores nobis eligendi quisquam mollitia, quia assumenda est illum. Dignissimos doloremque obcaecati quo laborum vel ducimus, natus, odio dicta cumque fugit maiores reprehenderit incidunt exercitationem eos repellendus architecto sed. Porro, ipsam numquam nobis architecto, molestiae eos eum accusamus quidem et non culpa ipsa nihil tenetur dolor similique minus officia cumque totam provident?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Our Story */}
            <div className="py-[50px] bg-zinc-200 dark:bg-zinc-900">
                <div className="site-container">
                    <div className="pb-[20px] md:pb-[30px] text-left md:text-center">
                        <h1 className="inline-block font-poppins font-bold text-[20px] md:text-[26px] text-zinc-800 dark:text-zinc-200">
                            Our Story
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        {
                            aboutStories.reverse().map((item) => (
                                <div key={item.story_id} className="flex flex-col gap-y-[5px] md:gap-y-[20px] p-[20px] md:p-[50px] md:min-h-[450px] bg-white dark:bg-zinc-950">
                                    <div>
                                        <h2 className="font-poppins font-bold text-[22px] md:text-[30px] text-zinc-700 dark:text-zinc-200">
                                            {item.story_year}
                                        </h2>
                                    </div>
                                    <div className="mt-auto">
                                        <div className="pb-[5px]">
                                            <h3 className="font-poppins font-semibold text-[16px] md:text-[18px] text-zinc-900 dark:text-zinc-200">
                                                {item.story_title}
                                            </h3>
                                        </div>
                                        <p className="font-poppins text-[14px] md:text-[16px] text-zinc-600 dark:text-zinc-300">
                                            {item.story_content}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            {/* FAQs */}
            <div className="py-[50px] bg-white dark:bg-zinc-950">
                <div className="site-container">
                    <div className="flex items-start gap-x-[30px] gap-y-[20px] flex-col mdl-1:flex-row">
                        <div className="w-full mdl-1:w-[300px]">
                            <div className="pb-[0px]">
                                <h1 className="inline-block font-poppins font-bold text-[20px] md:text-[26px] text-zinc-800 dark:text-zinc-200">
                                    FAQs
                                </h1>
                            </div>
                            <div>
                                <p className="font-roboto_mono text-[14px] md:text-[16px] text-zinc-600 dark:text-zinc-400">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                            </div>
                        </div>
                        <div className="w-full mdl-1:flex-1">
                            <Accordion type="single" collapsible className="w-full">
                                {
                                    faqsContent.map((item) => (
                                        <AccordionItem key={item.faq_id} value={item.faq_id} className="border-b-zinc-300 dark:border-b-zinc-800">
                                            <AccordionTrigger className="text-zinc-900 dark:text-zinc-200 text-left">
                                                {item.faq_question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-zinc-400 dark:text-zinc-400">
                                                {item.faq_content}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))
                                }
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default About;
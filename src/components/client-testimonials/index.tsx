import React from 'react';
import Image from "next/image";
import BecomeARecruiter from "@/components/testimonial-cards/BecomeARecruiter";
import HealthcareSignUp from "@/components/testimonial-cards/HealthcareSignUp";


const testimonials = [{
    id: 1,
    rating: 4,
    review: "IntelliCair has revolutionized our hiring process. The AI-driven platform made it incredibly easy to find qualified nurses who are the perfect fit for our team. The streamlined process saved us a lot of time and effort!",
    image: '',
    name: 'Sarah Thompson',
    description: 'HR Manager at City Hospital',
}, {
    id: 2,
    rating: 3,
    review: "As a nurse looking for new opportunities, IntelliCair was a game-changer for me. The platform is user-friendly, and the AI tools helped me create a standout resume. I landed my dream job within weeks!",
    image: '',
    name: 'Emily Rivera',
    description: 'Registered Nurse',
}, {
    id: 3,
    rating: 5,
    review: "The IntelliCair platform is fantastic! The AI interview scheduling and candidate evaluation tools are very efficient. It’s amazing how quickly we can fill positions with the right candidates.",
    image: '',
    name: 'James Watson',
    description: 'Director of Nursing at HealthCare Plus',
}
// ,
//     {
//     id: 4,
//     rating: 4,
//     review: "Pellentesque auctor arcu id velit pellentesque, id posuere risus pulvinar. Donec id ligula a odio consectetur.",
//     image: '',
//     name: 'Sit',
//     description: 'Marketing Manager',
// },
// {
//     id: 5,
//     rating: 5,
//     review: "Phasellus convallis neque non odio sollicitudin, sed mattis dolor posuere. Curabitur condimentum vehicula nisi.",
//     image: '',
//     name: 'Amet',
//     description: 'Front End Developer',
// }, {
//     id: 6,
//     rating: 3,
//     review: "Sed ornare purus ut risus euismod, vel fermentum nisl tristique. Nam tincidunt pharetra libero, ut ullamcorper felis posuere vel.",
//     image: '',
//     name: 'Consectetur',
//     description: 'Project Manager',
// }
]

interface IReview {
    id: number;
    rating: number;
    review: string;
    image: string;
    name: string;
    description: string;
}

const Testimonials = () => {


    const testimonialCard = (item: IReview[]) => {
        return item.map((item) => <div key={item.id}
                                       className={'rounded-xl flex flex-col bg-white shadow-md p-4 gap-2'}>
            <div className={'my-2'}>
                <Image src={'images/star.svg'} alt={'star'} width={32} height={32}/>
            </div>
            <div className={'flex flex-1'}>
                <p className={'text-sm'}>
                    “{item.review}”
                </p>
            </div>
            <div className={'mt-12 w-full flex gap-1 self-start align-middle items-center justify-center'}>
                <div className={'rounded-full p-1 flex justify-start items-center bg-white'}>
                    <Image width={48} height={48} src={'images/image.svg'} alt={'check'}/>
                </div>
                <div className={'flex flex-grow flex-col justify-center gap-1 items-start'}>
                    <p className={'text-[#18191C] text-sm'}>{item.name}</p>
                    <p className={'text-[#767F8C] text-xs'}>{item.description}</p>
                </div>
                <div className={'rounded-full p-1 flex justify-end items-end bg-white'}>
                    <Image width={24} height={24} src={'images/Quote.svg'} alt={'check'}/>
                </div>

            </div>
        </div>)
    }


    return (<div className={'flex py-24 flex-col justify-center custom-background'}>

        <div className={'container'}>
            <h2 className={'text-3xl text-center'}>Clients Testimonial</h2>
            <div className={'grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-20'}>
                {testimonialCard(testimonials)}
            </div>

            <div className={'flex gap-4'}>
                <BecomeARecruiter/>
                <HealthcareSignUp/>

            </div>

        </div>


    </div>);
};

export default Testimonials;

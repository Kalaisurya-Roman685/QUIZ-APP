import React, { useState } from 'react'
import { useEffect } from 'react'
import datas from './../Data/Data';
import './styles/Home.scss';

function Home() {


    const [data, setData] = useState(datas);

    const [show, setShow] = useState(false);

    const [step, setStep] = useState(0);

    const [sources, setSources] = useState(0);

    const [emojes, setEmojes] = useState(``)
    const [emojes2, setEmojes2] = useState(``)
    const [emojes3, setEmojes3] = useState(``)
    const [emojes4, setEmojes4] = useState(``)
    const [emojes5, setEmojes5] = useState(``)





    useEffect(() => {
        setData(datas);

        if (sources === 0) {
            setEmojes(`😭`);
        }
        if (sources === 1) {
            setEmojes2(`🥲`)
        }
        if (sources === 2) {
            setEmojes3(`☹️`)
        }
        if (sources === 3) {
            setEmojes4(`😁`)
        }
        if (sources === 4) {
            setEmojes5(`😎`)
        }
    }, [])

    const handlemove = (correct) => {

        if (correct === true) {
            setSources(sources + 1);
        }

        const nextstepcount = step + 1;
        if (nextstepcount < data.length) {
            setStep(nextstepcount);
        }
        else {
            setShow(true);
        }
    }

    const ReStart = () => {
        setSources(0);
        setShow(false);
        setStep(0);
    }


    return (
        <div className='main-section'>

            <div className='inside-section'>
                {data.length === 0 && <div>No Data Found</div>}

                <div className='text-center mb- fs-1'>
                    <h1>{data[step]?.question}</h1>

                </div>
                {show ? <>
                    <div className='text-center mb- fs-1'>

                        <div className='text-center'>
                            {sources === 0 && <h1>😭</h1>}
                            {sources === 1 && <h1>🥲</h1>}
                            {sources === 2 && <h1>☹️</h1>}
                            {sources === 3 && <h1>😁</h1>}
                            {sources === 4 && <h1>😎</h1>}
                            {sources === 5 && <h1>🤩</h1>}
                        </div>
                        <h1>question Correct {sources}/{data.length}  </h1>
                        <div>
                            <button onClick={ReStart}>Restart</button>
                        </div>
                    </div>
                </> : <>

                    <div>
                        <h1>question Coorect {step + 1}/{data.length} </h1>
                    </div>
                    {data[step]?.answeroptions?.map((items, index) => {
                        return (
                            <div key={index}>
                                <button className='buttons mt-2 ' onClick={() => handlemove(items?.isCorrect)}>{items?.answertext}</button>
                            </div>
                        )
                    })}
                </>}
            </div>
        </div>
    )
}

export default Home
import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import datas from './../Data/Data';
import './styles/Home.scss';
import { Modal } from "bootstrap";

import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
    const userefs = useRef(null);

    const [data, setData] = useState(datas);
    const [show, setShow] = useState(false);
    const [step, setStep] = useState(0);
    const [sources, setSources] = useState(0);
    const [models, setModels] = useState(false);



    useEffect(() => {
        setData(datas);
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
            showModal();
        }
    }

    const ReStart = () => {
        setSources(0);
        setShow(false);
        setStep(0);
    }


    const showModal = () => {
        const modalEle = userefs.current;
        const bsModal = new Modal(modalEle, {
            backdrop: "static",
            keyboard: false,
        });
        bsModal.show();
    };

    const hideModal = () => {
        const modalEle = userefs.current;
        const bsModal = Modal.getInstance(modalEle);
        bsModal.hide();
    };

    const [sendmails, setSendMail] = useState({
        user_name: "",
        user_email: "",
        user_score: ""
    });

    const { user_email, user_name, user_score } = sendmails;

    const handleChange = (e) => {
        setSendMail({ ...Home.sendmails, [e.target.name]: arguments.target.value });
    }




    const sendMail = (e) => {
        e.preventDefault();

        console.log(sendmails, "kalai amma appa");
        // emailjs
        //     .sendForm(
        //         "service_9w8q0y9",
        //         "template_1xpu9zq",
        //         datas,
        //         "WjaU6fWuAvTLzZ6cY"
        //     )
        //     .then((e) => {
        //         console.log(e.text);
        //         toast("Successfully Send Message...😀");
        //         hideModal()
        //     })
        //     .catch((er) => {
        //         console.log(er);
        //         toast("Check Your Internet Connection...🥺")
        //     });
        // e.target.reset();





    };

    return (
        <div className='main-section'>

            <ToastContainer />

            <div className='headers mb-5'>

            </div>

            <div className='inside-section mt-5'>
                {data.length === 0 && <div>No Data Found</div>}

                <div>
                    {show ? <></> : <div>
                        <h1>{step + 1}/{data.length} </h1>
                    </div>}
                </div>
                {show ? <></> : <div className='text-center'>
                    <h1 className='questions'>{step + 1}.{data[step]?.question}</h1>
                </div>}
                {show ? <>
                    <div className='text-center mb- fs-1'>

                        <div className='text-center mb-4'>
                            {sources === 0 && <h1 style={{ fontSize: "5rem" }}>😭</h1>}
                            {sources === 1 && <h1 style={{ fontSize: "5rem" }}>🥲</h1>}
                            {sources === 2 && <h1 style={{ fontSize: "5rem" }}>☹️</h1>}
                            {sources === 3 && <h1 style={{ fontSize: "5rem" }}>😁</h1>}
                            {sources === 4 && <h1 style={{ fontSize: "5rem" }}>😎</h1>}
                            {sources === 5 && <h1 style={{ fontSize: "5rem" }}>🤩</h1>}
                        </div>
                        <div className='mt-5 mb-3'>
                            <h1>Your Score {sources}/{data.length}  </h1>
                        </div>
                        <div className='mt-5'>
                            <button onClick={ReStart} className="restart">Restart</button>
                        </div>
                    </div>
                </> : <>

                    {/* <div>
                        <h1>{step + 1}.question Correct {step + 1}/{data.length} </h1>
                    </div> */}
                    <div className='mt-5'>
                        {data[step]?.answeroptions?.map((items, index) => {
                            return (
                                <div key={index} className="mb-3">
                                    <button className='buttons mt-2 ' onClick={() => handlemove(items?.isCorrect)}>{items?.answertext}</button>
                                </div>
                            )
                        })}
                    </div>
                </>}

                <>
                    <p
                        type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                    ></p>
                    <div class="modal fade" id="staticBackdrop" ref={userefs} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title text-center" id="staticBackdropLabel">Test</h5>
                                    {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={sendMail}>
                                        <div class="mb-4 col-sm-6  col-md-6 col-lg-12">
                                            <label for="exampleInputEmail1" class="form-label">User Name</label>
                                            <input type="text" class="form-control" name="user_name" id="exampleInputname1" onChange={handleChange} value={user_name} required />

                                        </div>
                                        <div class="mb-4 col-sm-6 col-md-6 col-lg-12">
                                            <label for="exampleInputPassword1" class="form-label">Email</label>
                                            <input type="email" class="form-control" name="user_email" id="exampleInputeMail1" onChange={handleChange} value={user_email} required />
                                        </div>

                                        <div class="mb-4 col-sm-6 col-md-6 col-lg-12">
                                            <label for="exampleInputPassword1" class="form-label">Your Soure</label>
                                            <input type="text" class="form-control" name="user_score" value={user_score} id="exampleInputeMai1" onChange={handleChange} required />
                                        </div>
                                        <button type="submit" class="submit">Submit</button>
                                    </form>
                                </div>
                                {/* <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Understood</button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </>

            </div>
        </div>
    )
}

export default Home
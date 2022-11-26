import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import datas from './../Data/Data';
import './styles/Home.scss';
import { Modal } from "bootstrap";

// import emailjs from "emailjs-com";
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


    const sendMail = (e) => {
        e.preventDefault();
        // if (e.target === "") {
        //     toast("plss field is empty!!!")
        // }
        // emailjs
        //     .sendForm(
        //         "new-mail-contact",
        //         "template_28bus1a",
        //         e.target,
        //         "uoeS6Kk01IqV3ceeC"
        //     )
        //     .then((e) => {
        //         console.log(e.text);
        //         toast("Successfully Send Message...😀")
        //     })
        //     .catch((er) => {
        //         console.log(er);
        //         toast("Check Your Internet Connection...🥺")
        //     });
        // e.target.reset();
    };

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

                <>
                    <p
                        type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                    ></p>
                    <div class="modal fade" id="staticBackdrop" ref={userefs} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={sendMail}>
                                        <div class="mb-4 col-sm-6  col-md-6 col-lg-8">
                                            <label for="exampleInputEmail1" class="form-label">User Name</label>
                                            <input type="text" class="form-control" name="username" id="exampleInputname1" required />
                                            <div id="emailHelp" class="form-text">
                                            </div>
                                        </div>
                                        <div class="mb-4 col-sm-6 col-md-6 col-lg-8">
                                            <label for="exampleInputPassword1" class="form-label">Email</label>
                                            <input type="text" class="form-control" name="email" id="exampleInputeMail1" required />
                                        </div>
                                        <div class="mb-4 col-sm-6 col-md-6 col-lg-8">
                                            <label for="exampleInputPassword1" class="form-label">Your Soure</label>
                                            <input type="text" class="form-control" name="message" id="exampleInputeMai1" value={`
                                            ${sources} / ${data.length}`} required disabled />
                                        </div>
                                        <button type="submit" class="btn btn-primarys">Submit</button>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Understood</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            </div>
        </div>
    )
}

export default Home
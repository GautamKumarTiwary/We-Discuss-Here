import React, { useContext, useEffect, useRef, useState } from 'react'
import questionContext from "../context/question/questionContext"
import Questionitem from './Questionitem';
import AddQuestion from './AddQuestion';

const Question = () => {
    const context = useContext(questionContext);
    const { questions, getQuestions, editQuestion } = context;
    useEffect(() => {
        getQuestions()
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [Question, setQuestion] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const updateQuestion = (currentQuestion) => {
        ref.current.click();
        setQuestion({id: currentQuestion._id, etitle: currentQuestion.title, edescription: currentQuestion.description, etag:currentQuestion.tag})
    }

    const handleClick = (e)=>{ 
        editQuestion(Question.id, Question.etitle, Question.edescription, Question.etag)
        refClose.current.click();
    }

    const onChange = (e)=>{
        setQuestion({...Question, [e.target.name]: e.target.value})
    }

    return (
        <>
            <AddQuestion />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Question</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={Question.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={Question.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={Question.etag} onChange={onChange} />
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={Question.etitle.length<5 || Question.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Question</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>You Questions</h2>
                <div className="container mx-2"> 
                {questions.length===0 && 'No questions to display'}
                </div>
                {questions.map((Question) => {
                    return <Questionitem key={Question._id} updateQuestion={updateQuestion} Question={Question} />
                })}
            </div>
        </>
    )
}

export default Questions;
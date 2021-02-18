import Link from 'next/link'
import { useState, useEffect, createContext } from 'react'
import fetch from 'isomorphic-unfetch'
import { Button, Form, Loader } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import { server } from '../config'


function NewNote() {
    const [form, setForm] = useState({ title: '', description: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({})
    const router = useRouter()

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createNote()
            } else {
                setIsSubmitting(false)
            }
        }
    }, [errors])

    async function createNote() {
        try {
            const res = await fetch(`${server}/api/notes`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/")
        } catch (err) {
            console.log(err);
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        let errs = validate()
        setErrors(errs)
        setIsSubmitting(true)
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function validate() {
        let err = {}
        if (!form.title) {
            err.title = ' Title is required'
        }
        if (!form.description) {
            err.description = 'Description is required'
        }

        return err
    }

    return (
        <div className="form-container">
            <h1>CreateNote</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                label='Title'
                                placeholder='Title'
                                name='title'
                                onChange={handleChange}
                            >
                            </Form.Input>
                            <Form.TextArea
                                fluid
                                error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                                label='Description'
                                placeholder='Description'
                                name='description'
                                onChange={handleChange}
                            >
                            </Form.TextArea>
                            <Button type="submit">Create</Button>
                        </Form>

                }
            </div>
        </div>
    )
}

export default NewNote
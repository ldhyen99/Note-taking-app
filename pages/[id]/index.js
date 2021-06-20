import fetch from 'isomorphic-unfetch'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Confirm, Button, Loader } from 'semantic-ui-react'
import { server } from '../../config'
import axios from 'axios';
function Note ({ notes }) {
    const [confirm, setConfirm] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    useEffect(() => {
       if (isDeleting) {
           deleteNote()
       }
    }, [isDeleting])

    function open () {
        setConfirm(true)
    }

    function close () {
        setConfirm(false)
    }

    async function deleteNote () {
        const noteId = router.query.id
        try {
            const deteled = await fetch(`${server}/api/notes/${noteId}`, {
                method: "Delete"
            })

            router.push("/")
        } catch (err) {
            console.log(err);
        }
    }

    async function handleDelete () {
        setIsDeleting(true)
        close()
    }

    function backButton() {
        router.push("/")
    }

    return (
        <div className="note-container">
            {isDeleting 
            ? <Loader active/>  
            :
            <>
                <h1>{notes.title}</h1>
                <p>{notes.description}</p>
                <Button color="red" onClick={open}>Delete</Button>
                    <Button color="yellow" onClick={backButton}>Back</Button>
                <Confirm 
                    open={confirm}
                    onCancel={close}
                    onConfirm={handleDelete}
                />
            </>
            }
        </div>
    )
}

export const getStaticProps = async (context) => {
    const res = await fetch(`${server}/api/notes/${context.params.id}`)
    const { data } = await res.json()
  
  
    return {
      props: {
        notes: data
      }
    }
}

export const getStaticPaths = async () => {
    const url = `${server}/api/notes`

    const res = await axios.get(url);
    const { data } = await res.data
    const ids = data?.map(item => item._id)
    // console.log("ids: >>",ids);
    const paths = ids?.map(id => ({ params: { id: id.toString() } }))
    return {
        paths,
        fallback: false
    }
}


export default Note
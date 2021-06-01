import React from 'react';
import {useRouter} from "next/router";
import {destroyCookie} from "nookies";



const Profile = (user) => {
    const router = useRouter()
    const currentUser = JSON.parse(user.user)


    const handleLogOut = async (e) => {
        e.preventDefault()
        await fetch('/api/logout', {
            method: 'POST',
            headers:{
                'Content0Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(()=>{
                destroyCookie(null,'currentUser')
            })
        await router.push('/en')
    }

    return (
        <div>
            <h1>Your Profile</h1>
            <p>Name: {currentUser.fullName}</p>
            <p>Email: {currentUser.email}</p>
            <p>Phone number: {currentUser.phone}</p>
            <p>Sex: {currentUser.gender}</p>
            <p>Birth date: {currentUser.date}</p>
            <button className={'btn btn-primary'} onClick={(e) => {
                handleLogOut(e)
            }}>Log out
            </button>
        </div>
    );
};




export  async function getServerSideProps(ctx) {

    const user = ctx.req ? ctx.req.cookies.currentUser : null

    return {
        props: {user}
    }
}



export default Profile;
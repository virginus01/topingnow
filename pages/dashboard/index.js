import React from 'react'
import UserLayout from '../../components/user_layout'


export default function Page() {
    return (
        <>
            <h1>Welcome </h1>
        </>
    )
}

Page.getLayout = function getLayout(page) {
    return (

        <UserLayout>{page}</UserLayout>

    )
}
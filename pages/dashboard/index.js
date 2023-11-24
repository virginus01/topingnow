import { sessionOptions } from '../../lib/session'
import UserLayout from '../../components/user_layout'
import { withIronSessionSsr } from 'iron-session/next'
import { withIronSessionApiRoute } from '../api/user'



export const getServerSideProps = withIronSessionSsr(async function ({
    req,
    res,
}) {
    const user = req.session.user

    if (user === undefined) {
        res.setHeader('location', '/auth/login')
        res.statusCode = 302
        res.end()
        return {
            props: {
                user: { isLoggedIn: false, login: '', avatarUrl: 'test.png' },
            },
        }
    }

    return {
        props: { user: req.session.user },
    }
},
    sessionOptions)

const Profile = ({ user }) => {
    // Show the user. No loading state is required
    return (
        <UserLayout>
            <h1>Your Profile</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </UserLayout>
    )
}

export default Profile
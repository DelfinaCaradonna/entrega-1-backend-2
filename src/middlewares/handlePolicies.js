import jwt from 'jsonwebtoken';

export const handlePolicies = (policies) => (req, res, next) => {

    if (policies[0] === 'PUBLIC') return next()

    const token = req.signedCookies?.currentUser
    if (!token) {
        return res.status(401).send({ status: 'error', error: 'no autorizado'})
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        if (!policies.includes(user.role.toUpperCase())) {
            return res.status(403).send({ status: 'error', error: 'forbidden'})
        }

        req.user = user
        next()
    } catch (error) {
        return res.status(500).send({ status: 'error', error: 'server error'})
    }
}
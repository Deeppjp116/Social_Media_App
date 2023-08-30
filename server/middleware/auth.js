import jwt from 'jsonwebtoken';
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.hader('Authorization');

    if (!token) return res.status(403).send('Acssed Deined');

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const varified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = varified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

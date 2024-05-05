import express from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' });
      }
      //@ts-ignore
      req.user = user;
  
      next();
    });
  };
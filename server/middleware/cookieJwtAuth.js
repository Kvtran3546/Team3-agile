import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token ?? "", process.env.MY_SECRET || "");
    req.body.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};

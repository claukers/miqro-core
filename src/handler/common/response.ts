import { OutgoingHttpHeaders } from "http";

export interface Response<T = any> {
  body?: T;
  status: number;
  headers: OutgoingHttpHeaders;
}

const TEXT_HEADERS = {
  ["Content-Type"]: "plain/text; charset=utf-8"
}

export const NOT_FOUND = (message = "NOT FOUND"): Response => {
  return {
    headers: TEXT_HEADERS,
    status: 404,
    body: message
  }
};

export const FORBIDDEN = (message = "FORBIDDEN"): Response => {
  return {
    headers: TEXT_HEADERS,
    status: 403,
    body: message
  }
}

export const UNAUTHORIZED = (message = "UNAUTHORIZED"): Response => {
  return {
    headers: TEXT_HEADERS,
    status: 401,
    body: message
  }
}

export const BAD_REQUEST = (message = "BAD REQUEST"): Response => {
  return {
    headers: TEXT_HEADERS,
    status: 400,
    body: message
  }
}

export const ERROR_RESPONSE = (message = "SERVER ERROR"): Response => {
  return {
    headers: TEXT_HEADERS,
    status: 503,
    body: message
  }
}

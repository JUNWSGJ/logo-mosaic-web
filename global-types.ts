declare namespace API {
  type Resp<Data> = {
    code: string
    message: string
    data: Data
  }
}

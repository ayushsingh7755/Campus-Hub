class ApiResponse{
    constructor(statuscode,data,message="Success"){
        this.message=message,
        this.statuscode=statuscode,
        this.data=data,
        this.success=statuscode<400

    }
}
export {ApiResponse}
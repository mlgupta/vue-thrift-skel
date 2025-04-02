struct GetDataRequest {
  1: required string ID;
}

struct GetDataResponse {
  1: string data;
  2: bool success;
  3: optional string errorMessage;
}

exception badMsg {
  1: i16 errorCode
  2: string msg
}
service APIService {
  GetDataResponse GetData(1: GetDataRequest request) throws(1: badMsg bm);
}

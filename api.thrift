struct GetDataRequest {
  1: required string ID;
}

struct GetDataResponse {
  1: string data;
  2: bool success;
  3: optional string errorMessage;
}

service APIService {
  GetDataResponse GetData(1: GetDataRequest request);
}

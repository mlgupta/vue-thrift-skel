import { Thrift } from 'thrift';
import Q from 'q';
import { GetDataRequest, GetDataResponse } from './api_types.js';

class APIService_GetData_args {
  constructor(args = {}) {
    this.request = null;
    
    if (args.request !== undefined && args.request !== null) {
      this.request = new GetDataRequest(args.request);
    }
  }

  [Symbol.for("read")](input) {
    input.readStructBegin();
    while (true) {
      const ret = input.readFieldBegin();
      const { ftype, fid } = ret;
      
      if (ftype === Thrift.Type.STOP) {
        break;
      }
      
      switch (fid) {
        case 1:
          if (ftype === Thrift.Type.STRUCT) {
            this.request = new GetDataRequest();
            this.request[Symbol.for("read")](input);
          } else {
            input.skip(ftype);
          }
          break;
        case 0:
          input.skip(ftype);
          break;
        default:
          input.skip(ftype);
      }
      
      input.readFieldEnd();
    }
    
    input.readStructEnd();
  }

  [Symbol.for("write")](output) {
    output.writeStructBegin('APIService_GetData_args');
    
    if (this.request !== null && this.request !== undefined) {
      output.writeFieldBegin('request', Thrift.Type.STRUCT, 1);
      this.request[Symbol.for("write")](output);
      output.writeFieldEnd();
    }
    
    output.writeFieldStop();
    output.writeStructEnd();
  }
}

class APIService_GetData_result {
  constructor(args = {}) {
    this.success = null;
    
    if (args.success !== undefined && args.success !== null) {
      this.success = new GetDataResponse(args.success);
    }
  }

  [Symbol.for("read")](input) {
    input.readStructBegin();
    while (true) {
      const ret = input.readFieldBegin();
      const { ftype, fid } = ret;
      
      if (ftype === Thrift.Type.STOP) {
        break;
      }
      
      switch (fid) {
        case 0:
          if (ftype === Thrift.Type.STRUCT) {
            this.success = new GetDataResponse();
            this.success[Symbol.for("read")](input);
          } else {
            input.skip(ftype);
          }
          break;
        default:
          input.skip(ftype);
      }
      
      input.readFieldEnd();
    }
    
    input.readStructEnd();
  }

  [Symbol.for("write")](output) {
    output.writeStructBegin('APIService_GetData_result');
    
    if (this.success !== null && this.success !== undefined) {
      output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
      this.success[Symbol.for("write")](output);
      output.writeFieldEnd();
    }
    
    output.writeFieldStop();
    output.writeStructEnd();
  }
}

export class APIServiceClient {
  constructor(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
  }

  seqid() { return this._seqid; }
  
  new_seqid() { return this._seqid += 1; }

  GetData(request, callback) {
    this._seqid = this.new_seqid();
    
    if (callback === undefined) {
      const _defer = Q.defer();
      this._reqs[this.seqid()] = (error, result) => {
        if (error) {
          _defer.reject(error);
        } else {
          _defer.resolve(result);
        }
      };
      this.send_GetData(request);
      return _defer.promise;
    } else {
      this._reqs[this.seqid()] = callback;
      this.send_GetData(request);
    }
  }

  send_GetData(request) {
    const output = new this.pClass(this.output);
    const params = { request };
    const args = new APIService_GetData_args(params);
    
    try {
      output.writeMessageBegin('GetData', Thrift.MessageType.CALL, this.seqid());
      args[Symbol.for("write")](output);
      output.writeMessageEnd();
      return this.output.flush();
    } catch (e) {
      delete this._reqs[this.seqid()];
      if (typeof output.reset === 'function') {
        output.reset();
      }
      throw e;
    }
  }

  recv_GetData(input, mtype, rseqid) {
    const callback = this._reqs[rseqid] || (() => {});
    delete this._reqs[rseqid];
    
    if (mtype === Thrift.MessageType.EXCEPTION) {
      const x = new Thrift.TApplicationException();
      x[Symbol.for("read")](input);
      input.readMessageEnd();
      return callback(x);
    }
    
    const result = new APIService_GetData_result();
    result[Symbol.for("read")](input);
    input.readMessageEnd();

    if (result.success !== null) {
      return callback(null, result.success);
    }
    
    return callback('GetData failed: unknown result');
  }
}

export class APIServiceProcessor {
  constructor(handler) {
    this._handler = handler;
  }

  process(input, output) {
    const r = input.readMessageBegin();
    
    if (this[`process_${r.fname}`]) {
      return this[`process_${r.fname}`].call(this, r.rseqid, input, output);
    } else {
      input.skip(Thrift.Type.STRUCT);
      input.readMessageEnd();
      
      const x = new Thrift.TApplicationException(
        Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 
        `Unknown function ${r.fname}`
      );
      
      output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
      x[Symbol.for("write")](output);
      output.writeMessageEnd();
      output.flush();
    }
  }

  process_GetData(seqid, input, output) {
    const args = new APIService_GetData_args();
    args[Symbol.for("read")](input);
    input.readMessageEnd();

    if (this._handler.GetData.length === 1) {
      Q.fcall(this._handler.GetData.bind(this._handler), args.request)
        .then((result) => {
          const result_obj = new APIService_GetData_result({ success: result });
          output.writeMessageBegin("GetData", Thrift.MessageType.REPLY, seqid);
          result_obj[Symbol.for("write")](output);
          output.writeMessageEnd();
          output.flush();
        })
        .catch((err) => {
          const result = new Thrift.TApplicationException(
            Thrift.TApplicationExceptionType.UNKNOWN, 
            err.message
          );
          output.writeMessageBegin("GetData", Thrift.MessageType.EXCEPTION, seqid);
          result[Symbol.for("write")](output);
          output.writeMessageEnd();
          output.flush();
        });
    } else {
      this._handler.GetData(args.request, (err, result) => {
        let result_obj;
        
        if (err === null || typeof err === 'undefined') {
          result_obj = new APIService_GetData_result(
            (err !== null || typeof err === 'undefined') ? err : { success: result }
          );
          output.writeMessageBegin("GetData", Thrift.MessageType.REPLY, seqid);
        } else {
          result_obj = new Thrift.TApplicationException(
            Thrift.TApplicationExceptionType.UNKNOWN, 
            err.message
          );
          output.writeMessageBegin("GetData", Thrift.MessageType.EXCEPTION, seqid);
        }
        
        result_obj[Symbol.for("write")](output);
        output.writeMessageEnd();
        output.flush();
      });
    }
  }
}

// CommonJS exports for backwards compatibility
export {
  APIServiceClient as Client,
  APIServiceProcessor as Processor,
  APIService_GetData_args,
  APIService_GetData_result
};
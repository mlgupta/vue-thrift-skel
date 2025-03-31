import { Thrift } from 'thrift';
import Int64 from 'node-int64';

export class GetDataRequest {
  constructor(args = {}) {
    this.ID = null;
    
    if (args.ID !== undefined && args.ID !== null) {
      this.ID = args.ID;
    } else {
      throw new Thrift.TProtocolException(
        Thrift.TProtocolExceptionType.UNKNOWN, 
        'Required field ID is unset!'
      );
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
          if (ftype === Thrift.Type.STRING) {
            this.ID = input.readString();
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
    output.writeStructBegin('GetDataRequest');
    
    if (this.ID !== null && this.ID !== undefined) {
      output.writeFieldBegin('ID', Thrift.Type.STRING, 1);
      output.writeString(this.ID);
      output.writeFieldEnd();
    }
    
    output.writeFieldStop();
    output.writeStructEnd();
  }
}

export class GetDataResponse {
  constructor(args = {}) {
    this.data = null;
    this.success = null;
    this.errorMessage = null;
    
    if (args.data !== undefined && args.data !== null) {
      this.data = args.data;
    }
    if (args.success !== undefined && args.success !== null) {
      this.success = args.success;
    }
    if (args.errorMessage !== undefined && args.errorMessage !== null) {
      this.errorMessage = args.errorMessage;
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
          if (ftype === Thrift.Type.STRING) {
            this.data = input.readString();
          } else {
            input.skip(ftype);
          }
          break;
        case 2:
          if (ftype === Thrift.Type.BOOL) {
            this.success = input.readBool();
          } else {
            input.skip(ftype);
          }
          break;
        case 3:
          if (ftype === Thrift.Type.STRING) {
            this.errorMessage = input.readString();
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
    output.writeStructBegin('GetDataResponse');
    
    if (this.data !== null && this.data !== undefined) {
      output.writeFieldBegin('data', Thrift.Type.STRING, 1);
      output.writeString(this.data);
      output.writeFieldEnd();
    }
    
    if (this.success !== null && this.success !== undefined) {
      output.writeFieldBegin('success', Thrift.Type.BOOL, 2);
      output.writeBool(this.success);
      output.writeFieldEnd();
    }
    
    if (this.errorMessage !== null && this.errorMessage !== undefined) {
      output.writeFieldBegin('errorMessage', Thrift.Type.STRING, 3);
      output.writeString(this.errorMessage);
      output.writeFieldEnd();
    }
    
    output.writeFieldStop();
    output.writeStructEnd();
  }
}

// CommonJS exports for backwards compatibility
// module.exports = {
//   GetDataRequest,
//   GetDataResponse,
//   ttypes: { GetDataRequest, GetDataResponse }
// };


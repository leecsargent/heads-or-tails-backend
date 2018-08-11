'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  // POST /api/users
  createUser: {
    body: {
      username: _joi2.default.string().required(),
      mobileNumber: _joi2.default.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: _joi2.default.string().required(),
      mobileNumber: _joi2.default.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: _joi2.default.string().hex().required()
    }
  },

  // POST /api/projects
  createProject: {
    body: {
      title: _joi2.default.string().required(),
      slug: _joi2.default.string().required()
    }
  },

  // UPDATE /api/project/:projectId
  udpateProject: {
    body: {
      title: _joi2.default.string().required(),
      slug: _joi2.default.string().required()
    },
    params: {
      projectId: _joi2.default.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: _joi2.default.string().required(),
      password: _joi2.default.string().required()
    }
  }
};
//# sourceMappingURL=param-validation.js.map

const m2s = require("mongoose-to-swagger");
const User = require("./model/user.model");

exports.options = {
    "openapi": "3.1.0",
    "info": {
        "version": "1.0.0",
        "title": "CoinTrack-Api",
        "description": "The RESTApi for CoinTrack",
        "contact": {
            "name": "Dionisis",
            "url": "https://github.com/LiontosDionisis",
            "email": "DionisisLiontos@outlook.com"
        }
    },
    "servers": [
        {
            "url": "https://localhost:5000",
            "description": "Local server"
        }
    ],
    "tags": [
        {
            "name": "Users",
            "description": "API endpoint for Users"
        }
    ],
    "components": {
        "schemas": {
            "User": m2s(User)
        }
    },
    "paths": {
        "/api/user/updateEmail": {
            "post": {
                "tags": ["Users"],
                "description": "Updates user's email",
                "requestBody": {
                    "description": "User scheme to insert",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "userId": { "type": "string" },
                                    "email": { "type": "string" }
                                },
                                "required": ["userId", "email"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success message",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "Email updated." }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Error message",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "User not found." }
                                    }
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Error message",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "Email already exists." }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Error message",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "Internal server error." }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/user/updateName": {
            "post": {
                "tags": ["Users"],
                "description": "Updates user's name.",
                "requestBody": {
                    "description": "User schema to insert",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "userId": { "type": "string" },
                                    "name": { "type": "string" }
                                },
                                "required": ["userId", "name"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success message.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "Name updated." }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Error message.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "User id is required" }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Error message.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "Internal server error." }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/user/updatePassword": {
            "post": {
                "tags": ["Users"],
                "description": "Update password",
                "requestBody": {
                    "description": "User schema to insert",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "userId": { "type": "string" },
                                    "oldPass": { "type": "string" },
                                    "newPass": { "type": "string" }
                                },
                                "required": ["userId", "oldPass", "newPass"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success message",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "Password updated" }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Validation Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "User id is required" }
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Error message",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "Incorrect password" }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Error message",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "Internal server error." }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/user/updateUsername": {
            "post": {
                "tags": ["Users"],
                "description": "Update user's username",
                "requestBody": {
                    "description": "User schema to insert",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "userId": { "type": "string" },
                                    "username": { "type": "string" }
                                },
                                "required": ["userId", "username"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success message",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "Username updated" }
                                    }
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Error message",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "User ID not found." }
                                    }
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Error message",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "Username already registered." }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Error message",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "Internal server error." }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/user/login": {
            "post": {
                "tags": ["Users"],
                "description": "Login a user",
                "requestBody": {
                    "description": "User schema to insert",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": { "type": "string" },
                                    "password": { "type": "string" }
                                },
                                "required": ["username", "password"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success message",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "token": { "type": "string", "example": "JWT token" },
                                        "name": { "type": "string", "example": "user's name" },
                                        "username": { "type": "string", "example": "user's username" },
                                        "totalIncome": { "type": "number", "example": 0 },
                                        "totalExpenses": { "type": "number", "example": 0 },
                                        "wallet": { "type": "number", "example": 0 }
                                    }
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Error message",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "Username not found." }
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Error message",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "Incorrect password." }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Error message",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "Internal server error." }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/user/signup": {
            "post": {
                "tags": ["Users"],
                "description": "Registers a user",
                "requestBody": {
                    "description": "User schema to insert",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "name": { "type": "string" },
                                    "username": { "type": "string" },
                                    "password": { "type": "string" },
                                    "email": { "type": "string" }
                                },
                                "required": ["name", "username", "password", "email"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "New user created",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "name": { "type": "string", "example": "user's name" },
                                        "username": { "type": "string", "example": "user's username" },
                                        "email": { "type": "string", "example": "user's email" },
                                        "password": { "type": "string", "example": "user's hashed password" },
                                        "totalIncome": { "type": "number", "example": 0},
                                        "totalExpenses": { "type": "number", "example": 0 },
                                        "wallet": { "type": "number", "example": 0}
                                    }
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Validation Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "Name is required." }
                                    }
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "Error message",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "Email already exists || username already taken" }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Error message",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string", "example": "Internal server error." }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/user/delete/{userId}": {
            "delete": {
              "tags": ["Users"],
              "parameters": [
                {
                  "name": "userId",
                  "in": "path",
                  "required": true,
                  "description": "User's ID",
                  "schema": {
                    "type": "string"
                  }
                }
              ],
              "description": "Deletes a user by their ID",
              "responses": {
                "200": {
                  "description": "Success message",
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "object",
                        "properties": {
                          "name": { "type": "string", "example": "user's name" },
                          "username": { "type": "string", "example": "user's username" },
                          "email": { "type": "string", "example": "user's email" },
                          "password": { "type": "string", "example": "user's hashed password" },
                          "totalIncome": { "type": "number", "example": 0 },
                          "totalExpenses": { "type": "number", "example": 0 },
                          "wallet": { "type": "number", "example": 0 }
                        }
                      }
                    }
                  }
                },
                "404": {
                  "description": "Error message",
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "object",
                        "properties": {
                          "message": { "type": "string", "example": "User not found || other error message" }
                        }
                      }
                    }
                  }
                }
              }
            }
        },
        "/api/user/addExpense": {
            "post": {
              "tags": ["Users"],
              "description": "Adds user expenses",
              "requestBody": {
                "description": "User schema to insert",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "expenseAmount": { "type": "number" },
                        "expenseSource": { "type": "string" },
                        "userId": { "type": "string" }
                      },
                      "required": ["expenseAmount", "userId"]
                    }
                  }
                }
              },
              "responses": {
                "201": {
                  "description": "Success message and data",
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "object",
                        "properties": {
                          "message": { "type": "string", "example": "Expenses added." },
                          "totalExpenses": { "type": "number", "example": "User's total expenses" },
                          "wallet": { "type": "number", "example": "User's wallet." }
                        }
                      }
                    }
                  }
                },
                "404": {
                  "description": "Error message",
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "object",
                        "properties": {
                          "message": { "type": "string", "example": "User not found" }
                        }
                      }
                    }
                  }
                },
                "500": {
                  "description": "Error message",
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "object",
                        "properties": {
                          "message": { "type": "string", "example": "Internal server error" }
                        }
                      }
                    }
                  }
                }
              }
            }
        },
        "/api/user/getWallet": {
            "post": {
                "tags": ["Users"],
                "description": "Gets user's wallet",
                "requestBody": {
                    "description": "User schema to insert",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "userId": {"type": "String"}
                                },
                                "required": ["userId"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Get user's wallet",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "wallet": {"type": "number", "example": "User's wallet amount"}
                                    }
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Error message",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {"type": "string", "example": "User not found"}
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Error message",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {"type": "string", "example": "Internal server error."}
                                    }
                                }
                            }
                        }
                    }  
                }
            }
        }
    }
};

export function item2response(inputDescription, inputItems) {
  return {
    description: inputDescription,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "Success"},
            error: { type: "object", nullable: true, example: null },
            success: inputItems
          }
        }
      }
    }
  };
}

export const page2response = (inputDescription,inputItems) => {
  return {
    description: inputDescription,
    content: {
        'application/json': {
            schema: {
            type: 'object',
            properties: {
                resultType: { type: 'string', example: 'SUCCESS' },
                error: { type: 'object', nullable: true, example: null },
                success: {
                type: 'object',
                properties: {
                    datas: {
                    type: 'array',
                    items: inputItems
                    },
                    pagination: {
                        cursor: { type: 'integer' }
                    }
                  }
                }
              }
            }
          }
        }
  };
}

export function error2response(inputDescription, inputReason, errorcode){
    return {
        description: inputDescription,
        content: {
            'application/json': {
                schema: {
                type: 'object',
                properties: {
                    resultType: { type: 'string', example: 'FAIL' },
                    error: {
                    type: 'object',
                    properties: {
                        errorCode: { type: 'string', example: errorcode },
                        reason: { type: 'string', example: inputReason },
                        data: { type: 'object' }
                      }
                    },
                    success: { type: "object", nullable: true, example: null }
                  }
                }
              }
            }
          };
}

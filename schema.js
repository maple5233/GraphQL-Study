// schema.js
// 数据模式
const { graphql, GraphQLObjectType, GraphQLSchema, GraphQLInt } = require('graphql');

let count = 0;

let schema = new GraphQLSchema({
    // 查询count的值
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            count: {
                type: GraphQLInt,
                description: 'The count!',
                resolve() {
                    return count;
                }
            }
        }
    }),
    // mutation(变异)用于改变count的值  mutation操作是序列化执行的
    mutation: new GraphQLObjectType({
        name: 'RootMutationType',
        fields: {
            updateCount: {
                type: GraphQLInt,
                description: 'Update the count',
                resolve: function() {
                    count += 1;
                    return count;
                }
            }
        }
    })
});
/* 这段代码创建了一个 GraphQLSchema 实例。
这个 schema 的顶级查询对象会返回一个 RootQueryType 对象，这个 RootQueryType 对象有一个整数类型的 count 域。
GraphQL 除了支持整数（ Interger ），还支持字符串（ String ）、列表（ List ）等多种类型的数据 */
module.exports = schema;
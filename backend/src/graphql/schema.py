import strawberry
from src.graphql.queries import Query
from src.graphql.mutations import Mutation

schema = strawberry.Schema(query=Query, mutation=Mutation)
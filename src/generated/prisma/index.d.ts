
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model employees
 * 
 */
export type employees = $Result.DefaultSelection<Prisma.$employeesPayload>
/**
 * Model import_logs
 * 
 */
export type import_logs = $Result.DefaultSelection<Prisma.$import_logsPayload>
/**
 * Model time_entries
 * 
 */
export type time_entries = $Result.DefaultSelection<Prisma.$time_entriesPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const EmploymentType: {
  full_time: 'full_time',
  part_time: 'part_time',
  contract: 'contract',
  freelance: 'freelance'
};

export type EmploymentType = (typeof EmploymentType)[keyof typeof EmploymentType]


export const ImportStatus: {
  successful: 'successful',
  failed: 'failed'
};

export type ImportStatus = (typeof ImportStatus)[keyof typeof ImportStatus]

}

export type EmploymentType = $Enums.EmploymentType

export const EmploymentType: typeof $Enums.EmploymentType

export type ImportStatus = $Enums.ImportStatus

export const ImportStatus: typeof $Enums.ImportStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employees`: Exposes CRUD operations for the **employees** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employees.findMany()
    * ```
    */
  get employees(): Prisma.employeesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.import_logs`: Exposes CRUD operations for the **import_logs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Import_logs
    * const import_logs = await prisma.import_logs.findMany()
    * ```
    */
  get import_logs(): Prisma.import_logsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.time_entries`: Exposes CRUD operations for the **time_entries** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Time_entries
    * const time_entries = await prisma.time_entries.findMany()
    * ```
    */
  get time_entries(): Prisma.time_entriesDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    users: 'users',
    employees: 'employees',
    import_logs: 'import_logs',
    time_entries: 'time_entries'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "users" | "employees" | "import_logs" | "time_entries"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      employees: {
        payload: Prisma.$employeesPayload<ExtArgs>
        fields: Prisma.employeesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.employeesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.employeesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>
          }
          findFirst: {
            args: Prisma.employeesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.employeesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>
          }
          findMany: {
            args: Prisma.employeesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>[]
          }
          create: {
            args: Prisma.employeesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>
          }
          createMany: {
            args: Prisma.employeesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.employeesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>[]
          }
          delete: {
            args: Prisma.employeesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>
          }
          update: {
            args: Prisma.employeesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>
          }
          deleteMany: {
            args: Prisma.employeesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.employeesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.employeesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>[]
          }
          upsert: {
            args: Prisma.employeesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>
          }
          aggregate: {
            args: Prisma.EmployeesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployees>
          }
          groupBy: {
            args: Prisma.employeesGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeesGroupByOutputType>[]
          }
          count: {
            args: Prisma.employeesCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeesCountAggregateOutputType> | number
          }
        }
      }
      import_logs: {
        payload: Prisma.$import_logsPayload<ExtArgs>
        fields: Prisma.import_logsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.import_logsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$import_logsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.import_logsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$import_logsPayload>
          }
          findFirst: {
            args: Prisma.import_logsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$import_logsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.import_logsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$import_logsPayload>
          }
          findMany: {
            args: Prisma.import_logsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$import_logsPayload>[]
          }
          create: {
            args: Prisma.import_logsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$import_logsPayload>
          }
          createMany: {
            args: Prisma.import_logsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.import_logsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$import_logsPayload>[]
          }
          delete: {
            args: Prisma.import_logsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$import_logsPayload>
          }
          update: {
            args: Prisma.import_logsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$import_logsPayload>
          }
          deleteMany: {
            args: Prisma.import_logsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.import_logsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.import_logsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$import_logsPayload>[]
          }
          upsert: {
            args: Prisma.import_logsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$import_logsPayload>
          }
          aggregate: {
            args: Prisma.Import_logsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImport_logs>
          }
          groupBy: {
            args: Prisma.import_logsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Import_logsGroupByOutputType>[]
          }
          count: {
            args: Prisma.import_logsCountArgs<ExtArgs>
            result: $Utils.Optional<Import_logsCountAggregateOutputType> | number
          }
        }
      }
      time_entries: {
        payload: Prisma.$time_entriesPayload<ExtArgs>
        fields: Prisma.time_entriesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.time_entriesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$time_entriesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.time_entriesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$time_entriesPayload>
          }
          findFirst: {
            args: Prisma.time_entriesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$time_entriesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.time_entriesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$time_entriesPayload>
          }
          findMany: {
            args: Prisma.time_entriesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$time_entriesPayload>[]
          }
          create: {
            args: Prisma.time_entriesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$time_entriesPayload>
          }
          createMany: {
            args: Prisma.time_entriesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.time_entriesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$time_entriesPayload>[]
          }
          delete: {
            args: Prisma.time_entriesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$time_entriesPayload>
          }
          update: {
            args: Prisma.time_entriesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$time_entriesPayload>
          }
          deleteMany: {
            args: Prisma.time_entriesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.time_entriesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.time_entriesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$time_entriesPayload>[]
          }
          upsert: {
            args: Prisma.time_entriesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$time_entriesPayload>
          }
          aggregate: {
            args: Prisma.Time_entriesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTime_entries>
          }
          groupBy: {
            args: Prisma.time_entriesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Time_entriesGroupByOutputType>[]
          }
          count: {
            args: Prisma.time_entriesCountArgs<ExtArgs>
            result: $Utils.Optional<Time_entriesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    users?: usersOmit
    employees?: employeesOmit
    import_logs?: import_logsOmit
    time_entries?: time_entriesOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type EmployeesCountOutputType
   */

  export type EmployeesCountOutputType = {
    time_entries: number
  }

  export type EmployeesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    time_entries?: boolean | EmployeesCountOutputTypeCountTime_entriesArgs
  }

  // Custom InputTypes
  /**
   * EmployeesCountOutputType without action
   */
  export type EmployeesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeesCountOutputType
     */
    select?: EmployeesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployeesCountOutputType without action
   */
  export type EmployeesCountOutputTypeCountTime_entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: time_entriesWhereInput
  }


  /**
   * Count Type Import_logsCountOutputType
   */

  export type Import_logsCountOutputType = {
    time_entries: number
  }

  export type Import_logsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    time_entries?: boolean | Import_logsCountOutputTypeCountTime_entriesArgs
  }

  // Custom InputTypes
  /**
   * Import_logsCountOutputType without action
   */
  export type Import_logsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Import_logsCountOutputType
     */
    select?: Import_logsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Import_logsCountOutputType without action
   */
  export type Import_logsCountOutputTypeCountTime_entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: time_entriesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: number | null
    username: string | null
    passwordHash: string | null
    name: string | null
    email: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: number | null
    username: string | null
    passwordHash: string | null
    name: string | null
    email: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    username: number
    passwordHash: number
    name: number
    email: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    username?: true
    passwordHash?: true
    name?: true
    email?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    username?: true
    passwordHash?: true
    name?: true
    email?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    username?: true
    passwordHash?: true
    name?: true
    email?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: number
    username: string
    passwordHash: string
    name: string | null
    email: string | null
    role: string
    createdAt: Date
    updatedAt: Date
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    passwordHash?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    passwordHash?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    passwordHash?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    username?: boolean
    passwordHash?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "passwordHash" | "name" | "email" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["users"]>

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      passwordHash: string
      name: string | null
      email: string | null
      role: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'Int'>
    readonly username: FieldRef<"users", 'String'>
    readonly passwordHash: FieldRef<"users", 'String'>
    readonly name: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'String'>
    readonly createdAt: FieldRef<"users", 'DateTime'>
    readonly updatedAt: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
  }


  /**
   * Model employees
   */

  export type AggregateEmployees = {
    _count: EmployeesCountAggregateOutputType | null
    _avg: EmployeesAvgAggregateOutputType | null
    _sum: EmployeesSumAggregateOutputType | null
    _min: EmployeesMinAggregateOutputType | null
    _max: EmployeesMaxAggregateOutputType | null
  }

  export type EmployeesAvgAggregateOutputType = {
    id: number | null
    weeklyCommittedHours: number | null
  }

  export type EmployeesSumAggregateOutputType = {
    id: number | null
    weeklyCommittedHours: number | null
  }

  export type EmployeesMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    phone: string | null
    position: string | null
    department: string | null
    employmentType: $Enums.EmploymentType | null
    weeklyCommittedHours: number | null
    startDate: Date | null
    joinDate: Date | null
    isActive: boolean | null
    clockifyName: string | null
    bio: string | null
    avatarUrl: string | null
  }

  export type EmployeesMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    phone: string | null
    position: string | null
    department: string | null
    employmentType: $Enums.EmploymentType | null
    weeklyCommittedHours: number | null
    startDate: Date | null
    joinDate: Date | null
    isActive: boolean | null
    clockifyName: string | null
    bio: string | null
    avatarUrl: string | null
  }

  export type EmployeesCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    position: number
    department: number
    employmentType: number
    weeklyCommittedHours: number
    startDate: number
    joinDate: number
    isActive: number
    clockifyName: number
    bio: number
    avatarUrl: number
    _all: number
  }


  export type EmployeesAvgAggregateInputType = {
    id?: true
    weeklyCommittedHours?: true
  }

  export type EmployeesSumAggregateInputType = {
    id?: true
    weeklyCommittedHours?: true
  }

  export type EmployeesMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    position?: true
    department?: true
    employmentType?: true
    weeklyCommittedHours?: true
    startDate?: true
    joinDate?: true
    isActive?: true
    clockifyName?: true
    bio?: true
    avatarUrl?: true
  }

  export type EmployeesMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    position?: true
    department?: true
    employmentType?: true
    weeklyCommittedHours?: true
    startDate?: true
    joinDate?: true
    isActive?: true
    clockifyName?: true
    bio?: true
    avatarUrl?: true
  }

  export type EmployeesCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    position?: true
    department?: true
    employmentType?: true
    weeklyCommittedHours?: true
    startDate?: true
    joinDate?: true
    isActive?: true
    clockifyName?: true
    bio?: true
    avatarUrl?: true
    _all?: true
  }

  export type EmployeesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which employees to aggregate.
     */
    where?: employeesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
     */
    orderBy?: employeesOrderByWithRelationInput | employeesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: employeesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned employees
    **/
    _count?: true | EmployeesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmployeesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmployeesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeesMaxAggregateInputType
  }

  export type GetEmployeesAggregateType<T extends EmployeesAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployees]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployees[P]>
      : GetScalarType<T[P], AggregateEmployees[P]>
  }




  export type employeesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: employeesWhereInput
    orderBy?: employeesOrderByWithAggregationInput | employeesOrderByWithAggregationInput[]
    by: EmployeesScalarFieldEnum[] | EmployeesScalarFieldEnum
    having?: employeesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeesCountAggregateInputType | true
    _avg?: EmployeesAvgAggregateInputType
    _sum?: EmployeesSumAggregateInputType
    _min?: EmployeesMinAggregateInputType
    _max?: EmployeesMaxAggregateInputType
  }

  export type EmployeesGroupByOutputType = {
    id: number
    name: string
    email: string
    phone: string | null
    position: string | null
    department: string
    employmentType: $Enums.EmploymentType
    weeklyCommittedHours: number
    startDate: Date
    joinDate: Date | null
    isActive: boolean
    clockifyName: string | null
    bio: string | null
    avatarUrl: string | null
    _count: EmployeesCountAggregateOutputType | null
    _avg: EmployeesAvgAggregateOutputType | null
    _sum: EmployeesSumAggregateOutputType | null
    _min: EmployeesMinAggregateOutputType | null
    _max: EmployeesMaxAggregateOutputType | null
  }

  type GetEmployeesGroupByPayload<T extends employeesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeesGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeesGroupByOutputType[P]>
        }
      >
    >


  export type employeesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    position?: boolean
    department?: boolean
    employmentType?: boolean
    weeklyCommittedHours?: boolean
    startDate?: boolean
    joinDate?: boolean
    isActive?: boolean
    clockifyName?: boolean
    bio?: boolean
    avatarUrl?: boolean
    time_entries?: boolean | employees$time_entriesArgs<ExtArgs>
    _count?: boolean | EmployeesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employees"]>

  export type employeesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    position?: boolean
    department?: boolean
    employmentType?: boolean
    weeklyCommittedHours?: boolean
    startDate?: boolean
    joinDate?: boolean
    isActive?: boolean
    clockifyName?: boolean
    bio?: boolean
    avatarUrl?: boolean
  }, ExtArgs["result"]["employees"]>

  export type employeesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    position?: boolean
    department?: boolean
    employmentType?: boolean
    weeklyCommittedHours?: boolean
    startDate?: boolean
    joinDate?: boolean
    isActive?: boolean
    clockifyName?: boolean
    bio?: boolean
    avatarUrl?: boolean
  }, ExtArgs["result"]["employees"]>

  export type employeesSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    position?: boolean
    department?: boolean
    employmentType?: boolean
    weeklyCommittedHours?: boolean
    startDate?: boolean
    joinDate?: boolean
    isActive?: boolean
    clockifyName?: boolean
    bio?: boolean
    avatarUrl?: boolean
  }

  export type employeesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "phone" | "position" | "department" | "employmentType" | "weeklyCommittedHours" | "startDate" | "joinDate" | "isActive" | "clockifyName" | "bio" | "avatarUrl", ExtArgs["result"]["employees"]>
  export type employeesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    time_entries?: boolean | employees$time_entriesArgs<ExtArgs>
    _count?: boolean | EmployeesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type employeesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type employeesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $employeesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "employees"
    objects: {
      time_entries: Prisma.$time_entriesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      phone: string | null
      position: string | null
      department: string
      employmentType: $Enums.EmploymentType
      weeklyCommittedHours: number
      startDate: Date
      joinDate: Date | null
      isActive: boolean
      clockifyName: string | null
      bio: string | null
      avatarUrl: string | null
    }, ExtArgs["result"]["employees"]>
    composites: {}
  }

  type employeesGetPayload<S extends boolean | null | undefined | employeesDefaultArgs> = $Result.GetResult<Prisma.$employeesPayload, S>

  type employeesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<employeesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeesCountAggregateInputType | true
    }

  export interface employeesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['employees'], meta: { name: 'employees' } }
    /**
     * Find zero or one Employees that matches the filter.
     * @param {employeesFindUniqueArgs} args - Arguments to find a Employees
     * @example
     * // Get one Employees
     * const employees = await prisma.employees.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends employeesFindUniqueArgs>(args: SelectSubset<T, employeesFindUniqueArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Employees that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {employeesFindUniqueOrThrowArgs} args - Arguments to find a Employees
     * @example
     * // Get one Employees
     * const employees = await prisma.employees.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends employeesFindUniqueOrThrowArgs>(args: SelectSubset<T, employeesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesFindFirstArgs} args - Arguments to find a Employees
     * @example
     * // Get one Employees
     * const employees = await prisma.employees.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends employeesFindFirstArgs>(args?: SelectSubset<T, employeesFindFirstArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employees that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesFindFirstOrThrowArgs} args - Arguments to find a Employees
     * @example
     * // Get one Employees
     * const employees = await prisma.employees.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends employeesFindFirstOrThrowArgs>(args?: SelectSubset<T, employeesFindFirstOrThrowArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employees.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employees.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeesWithIdOnly = await prisma.employees.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends employeesFindManyArgs>(args?: SelectSubset<T, employeesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Employees.
     * @param {employeesCreateArgs} args - Arguments to create a Employees.
     * @example
     * // Create one Employees
     * const Employees = await prisma.employees.create({
     *   data: {
     *     // ... data to create a Employees
     *   }
     * })
     * 
     */
    create<T extends employeesCreateArgs>(args: SelectSubset<T, employeesCreateArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Employees.
     * @param {employeesCreateManyArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employees = await prisma.employees.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends employeesCreateManyArgs>(args?: SelectSubset<T, employeesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Employees and returns the data saved in the database.
     * @param {employeesCreateManyAndReturnArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employees = await prisma.employees.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Employees and only return the `id`
     * const employeesWithIdOnly = await prisma.employees.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends employeesCreateManyAndReturnArgs>(args?: SelectSubset<T, employeesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Employees.
     * @param {employeesDeleteArgs} args - Arguments to delete one Employees.
     * @example
     * // Delete one Employees
     * const Employees = await prisma.employees.delete({
     *   where: {
     *     // ... filter to delete one Employees
     *   }
     * })
     * 
     */
    delete<T extends employeesDeleteArgs>(args: SelectSubset<T, employeesDeleteArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Employees.
     * @param {employeesUpdateArgs} args - Arguments to update one Employees.
     * @example
     * // Update one Employees
     * const employees = await prisma.employees.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends employeesUpdateArgs>(args: SelectSubset<T, employeesUpdateArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Employees.
     * @param {employeesDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employees.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends employeesDeleteManyArgs>(args?: SelectSubset<T, employeesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employees = await prisma.employees.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends employeesUpdateManyArgs>(args: SelectSubset<T, employeesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees and returns the data updated in the database.
     * @param {employeesUpdateManyAndReturnArgs} args - Arguments to update many Employees.
     * @example
     * // Update many Employees
     * const employees = await prisma.employees.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Employees and only return the `id`
     * const employeesWithIdOnly = await prisma.employees.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends employeesUpdateManyAndReturnArgs>(args: SelectSubset<T, employeesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Employees.
     * @param {employeesUpsertArgs} args - Arguments to update or create a Employees.
     * @example
     * // Update or create a Employees
     * const employees = await prisma.employees.upsert({
     *   create: {
     *     // ... data to create a Employees
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employees we want to update
     *   }
     * })
     */
    upsert<T extends employeesUpsertArgs>(args: SelectSubset<T, employeesUpsertArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employees.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends employeesCountArgs>(
      args?: Subset<T, employeesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeesAggregateArgs>(args: Subset<T, EmployeesAggregateArgs>): Prisma.PrismaPromise<GetEmployeesAggregateType<T>>

    /**
     * Group by Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends employeesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: employeesGroupByArgs['orderBy'] }
        : { orderBy?: employeesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, employeesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the employees model
   */
  readonly fields: employeesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for employees.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__employeesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    time_entries<T extends employees$time_entriesArgs<ExtArgs> = {}>(args?: Subset<T, employees$time_entriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$time_entriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the employees model
   */
  interface employeesFieldRefs {
    readonly id: FieldRef<"employees", 'Int'>
    readonly name: FieldRef<"employees", 'String'>
    readonly email: FieldRef<"employees", 'String'>
    readonly phone: FieldRef<"employees", 'String'>
    readonly position: FieldRef<"employees", 'String'>
    readonly department: FieldRef<"employees", 'String'>
    readonly employmentType: FieldRef<"employees", 'EmploymentType'>
    readonly weeklyCommittedHours: FieldRef<"employees", 'Int'>
    readonly startDate: FieldRef<"employees", 'DateTime'>
    readonly joinDate: FieldRef<"employees", 'DateTime'>
    readonly isActive: FieldRef<"employees", 'Boolean'>
    readonly clockifyName: FieldRef<"employees", 'String'>
    readonly bio: FieldRef<"employees", 'String'>
    readonly avatarUrl: FieldRef<"employees", 'String'>
  }
    

  // Custom InputTypes
  /**
   * employees findUnique
   */
  export type employeesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * Filter, which employees to fetch.
     */
    where: employeesWhereUniqueInput
  }

  /**
   * employees findUniqueOrThrow
   */
  export type employeesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * Filter, which employees to fetch.
     */
    where: employeesWhereUniqueInput
  }

  /**
   * employees findFirst
   */
  export type employeesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * Filter, which employees to fetch.
     */
    where?: employeesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
     */
    orderBy?: employeesOrderByWithRelationInput | employeesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for employees.
     */
    cursor?: employeesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of employees.
     */
    distinct?: EmployeesScalarFieldEnum | EmployeesScalarFieldEnum[]
  }

  /**
   * employees findFirstOrThrow
   */
  export type employeesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * Filter, which employees to fetch.
     */
    where?: employeesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
     */
    orderBy?: employeesOrderByWithRelationInput | employeesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for employees.
     */
    cursor?: employeesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of employees.
     */
    distinct?: EmployeesScalarFieldEnum | EmployeesScalarFieldEnum[]
  }

  /**
   * employees findMany
   */
  export type employeesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * Filter, which employees to fetch.
     */
    where?: employeesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
     */
    orderBy?: employeesOrderByWithRelationInput | employeesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing employees.
     */
    cursor?: employeesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
     */
    skip?: number
    distinct?: EmployeesScalarFieldEnum | EmployeesScalarFieldEnum[]
  }

  /**
   * employees create
   */
  export type employeesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * The data needed to create a employees.
     */
    data: XOR<employeesCreateInput, employeesUncheckedCreateInput>
  }

  /**
   * employees createMany
   */
  export type employeesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many employees.
     */
    data: employeesCreateManyInput | employeesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * employees createManyAndReturn
   */
  export type employeesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * The data used to create many employees.
     */
    data: employeesCreateManyInput | employeesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * employees update
   */
  export type employeesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * The data needed to update a employees.
     */
    data: XOR<employeesUpdateInput, employeesUncheckedUpdateInput>
    /**
     * Choose, which employees to update.
     */
    where: employeesWhereUniqueInput
  }

  /**
   * employees updateMany
   */
  export type employeesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update employees.
     */
    data: XOR<employeesUpdateManyMutationInput, employeesUncheckedUpdateManyInput>
    /**
     * Filter which employees to update
     */
    where?: employeesWhereInput
    /**
     * Limit how many employees to update.
     */
    limit?: number
  }

  /**
   * employees updateManyAndReturn
   */
  export type employeesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * The data used to update employees.
     */
    data: XOR<employeesUpdateManyMutationInput, employeesUncheckedUpdateManyInput>
    /**
     * Filter which employees to update
     */
    where?: employeesWhereInput
    /**
     * Limit how many employees to update.
     */
    limit?: number
  }

  /**
   * employees upsert
   */
  export type employeesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * The filter to search for the employees to update in case it exists.
     */
    where: employeesWhereUniqueInput
    /**
     * In case the employees found by the `where` argument doesn't exist, create a new employees with this data.
     */
    create: XOR<employeesCreateInput, employeesUncheckedCreateInput>
    /**
     * In case the employees was found with the provided `where` argument, update it with this data.
     */
    update: XOR<employeesUpdateInput, employeesUncheckedUpdateInput>
  }

  /**
   * employees delete
   */
  export type employeesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * Filter which employees to delete.
     */
    where: employeesWhereUniqueInput
  }

  /**
   * employees deleteMany
   */
  export type employeesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which employees to delete
     */
    where?: employeesWhereInput
    /**
     * Limit how many employees to delete.
     */
    limit?: number
  }

  /**
   * employees.time_entries
   */
  export type employees$time_entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the time_entries
     */
    select?: time_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the time_entries
     */
    omit?: time_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: time_entriesInclude<ExtArgs> | null
    where?: time_entriesWhereInput
    orderBy?: time_entriesOrderByWithRelationInput | time_entriesOrderByWithRelationInput[]
    cursor?: time_entriesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Time_entriesScalarFieldEnum | Time_entriesScalarFieldEnum[]
  }

  /**
   * employees without action
   */
  export type employeesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
  }


  /**
   * Model import_logs
   */

  export type AggregateImport_logs = {
    _count: Import_logsCountAggregateOutputType | null
    _avg: Import_logsAvgAggregateOutputType | null
    _sum: Import_logsSumAggregateOutputType | null
    _min: Import_logsMinAggregateOutputType | null
    _max: Import_logsMaxAggregateOutputType | null
  }

  export type Import_logsAvgAggregateOutputType = {
    id: number | null
  }

  export type Import_logsSumAggregateOutputType = {
    id: number | null
  }

  export type Import_logsMinAggregateOutputType = {
    id: number | null
    startDate: Date | null
    endDate: Date | null
    importDate: Date | null
    status: $Enums.ImportStatus | null
    fileName: string | null
  }

  export type Import_logsMaxAggregateOutputType = {
    id: number | null
    startDate: Date | null
    endDate: Date | null
    importDate: Date | null
    status: $Enums.ImportStatus | null
    fileName: string | null
  }

  export type Import_logsCountAggregateOutputType = {
    id: number
    startDate: number
    endDate: number
    importDate: number
    status: number
    fileName: number
    _all: number
  }


  export type Import_logsAvgAggregateInputType = {
    id?: true
  }

  export type Import_logsSumAggregateInputType = {
    id?: true
  }

  export type Import_logsMinAggregateInputType = {
    id?: true
    startDate?: true
    endDate?: true
    importDate?: true
    status?: true
    fileName?: true
  }

  export type Import_logsMaxAggregateInputType = {
    id?: true
    startDate?: true
    endDate?: true
    importDate?: true
    status?: true
    fileName?: true
  }

  export type Import_logsCountAggregateInputType = {
    id?: true
    startDate?: true
    endDate?: true
    importDate?: true
    status?: true
    fileName?: true
    _all?: true
  }

  export type Import_logsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which import_logs to aggregate.
     */
    where?: import_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of import_logs to fetch.
     */
    orderBy?: import_logsOrderByWithRelationInput | import_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: import_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` import_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` import_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned import_logs
    **/
    _count?: true | Import_logsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Import_logsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Import_logsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Import_logsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Import_logsMaxAggregateInputType
  }

  export type GetImport_logsAggregateType<T extends Import_logsAggregateArgs> = {
        [P in keyof T & keyof AggregateImport_logs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImport_logs[P]>
      : GetScalarType<T[P], AggregateImport_logs[P]>
  }




  export type import_logsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: import_logsWhereInput
    orderBy?: import_logsOrderByWithAggregationInput | import_logsOrderByWithAggregationInput[]
    by: Import_logsScalarFieldEnum[] | Import_logsScalarFieldEnum
    having?: import_logsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Import_logsCountAggregateInputType | true
    _avg?: Import_logsAvgAggregateInputType
    _sum?: Import_logsSumAggregateInputType
    _min?: Import_logsMinAggregateInputType
    _max?: Import_logsMaxAggregateInputType
  }

  export type Import_logsGroupByOutputType = {
    id: number
    startDate: Date
    endDate: Date
    importDate: Date
    status: $Enums.ImportStatus
    fileName: string
    _count: Import_logsCountAggregateOutputType | null
    _avg: Import_logsAvgAggregateOutputType | null
    _sum: Import_logsSumAggregateOutputType | null
    _min: Import_logsMinAggregateOutputType | null
    _max: Import_logsMaxAggregateOutputType | null
  }

  type GetImport_logsGroupByPayload<T extends import_logsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Import_logsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Import_logsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Import_logsGroupByOutputType[P]>
            : GetScalarType<T[P], Import_logsGroupByOutputType[P]>
        }
      >
    >


  export type import_logsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startDate?: boolean
    endDate?: boolean
    importDate?: boolean
    status?: boolean
    fileName?: boolean
    time_entries?: boolean | import_logs$time_entriesArgs<ExtArgs>
    _count?: boolean | Import_logsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["import_logs"]>

  export type import_logsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startDate?: boolean
    endDate?: boolean
    importDate?: boolean
    status?: boolean
    fileName?: boolean
  }, ExtArgs["result"]["import_logs"]>

  export type import_logsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startDate?: boolean
    endDate?: boolean
    importDate?: boolean
    status?: boolean
    fileName?: boolean
  }, ExtArgs["result"]["import_logs"]>

  export type import_logsSelectScalar = {
    id?: boolean
    startDate?: boolean
    endDate?: boolean
    importDate?: boolean
    status?: boolean
    fileName?: boolean
  }

  export type import_logsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "startDate" | "endDate" | "importDate" | "status" | "fileName", ExtArgs["result"]["import_logs"]>
  export type import_logsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    time_entries?: boolean | import_logs$time_entriesArgs<ExtArgs>
    _count?: boolean | Import_logsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type import_logsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type import_logsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $import_logsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "import_logs"
    objects: {
      time_entries: Prisma.$time_entriesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      startDate: Date
      endDate: Date
      importDate: Date
      status: $Enums.ImportStatus
      fileName: string
    }, ExtArgs["result"]["import_logs"]>
    composites: {}
  }

  type import_logsGetPayload<S extends boolean | null | undefined | import_logsDefaultArgs> = $Result.GetResult<Prisma.$import_logsPayload, S>

  type import_logsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<import_logsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Import_logsCountAggregateInputType | true
    }

  export interface import_logsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['import_logs'], meta: { name: 'import_logs' } }
    /**
     * Find zero or one Import_logs that matches the filter.
     * @param {import_logsFindUniqueArgs} args - Arguments to find a Import_logs
     * @example
     * // Get one Import_logs
     * const import_logs = await prisma.import_logs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends import_logsFindUniqueArgs>(args: SelectSubset<T, import_logsFindUniqueArgs<ExtArgs>>): Prisma__import_logsClient<$Result.GetResult<Prisma.$import_logsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Import_logs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {import_logsFindUniqueOrThrowArgs} args - Arguments to find a Import_logs
     * @example
     * // Get one Import_logs
     * const import_logs = await prisma.import_logs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends import_logsFindUniqueOrThrowArgs>(args: SelectSubset<T, import_logsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__import_logsClient<$Result.GetResult<Prisma.$import_logsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Import_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {import_logsFindFirstArgs} args - Arguments to find a Import_logs
     * @example
     * // Get one Import_logs
     * const import_logs = await prisma.import_logs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends import_logsFindFirstArgs>(args?: SelectSubset<T, import_logsFindFirstArgs<ExtArgs>>): Prisma__import_logsClient<$Result.GetResult<Prisma.$import_logsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Import_logs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {import_logsFindFirstOrThrowArgs} args - Arguments to find a Import_logs
     * @example
     * // Get one Import_logs
     * const import_logs = await prisma.import_logs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends import_logsFindFirstOrThrowArgs>(args?: SelectSubset<T, import_logsFindFirstOrThrowArgs<ExtArgs>>): Prisma__import_logsClient<$Result.GetResult<Prisma.$import_logsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Import_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {import_logsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Import_logs
     * const import_logs = await prisma.import_logs.findMany()
     * 
     * // Get first 10 Import_logs
     * const import_logs = await prisma.import_logs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const import_logsWithIdOnly = await prisma.import_logs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends import_logsFindManyArgs>(args?: SelectSubset<T, import_logsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$import_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Import_logs.
     * @param {import_logsCreateArgs} args - Arguments to create a Import_logs.
     * @example
     * // Create one Import_logs
     * const Import_logs = await prisma.import_logs.create({
     *   data: {
     *     // ... data to create a Import_logs
     *   }
     * })
     * 
     */
    create<T extends import_logsCreateArgs>(args: SelectSubset<T, import_logsCreateArgs<ExtArgs>>): Prisma__import_logsClient<$Result.GetResult<Prisma.$import_logsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Import_logs.
     * @param {import_logsCreateManyArgs} args - Arguments to create many Import_logs.
     * @example
     * // Create many Import_logs
     * const import_logs = await prisma.import_logs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends import_logsCreateManyArgs>(args?: SelectSubset<T, import_logsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Import_logs and returns the data saved in the database.
     * @param {import_logsCreateManyAndReturnArgs} args - Arguments to create many Import_logs.
     * @example
     * // Create many Import_logs
     * const import_logs = await prisma.import_logs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Import_logs and only return the `id`
     * const import_logsWithIdOnly = await prisma.import_logs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends import_logsCreateManyAndReturnArgs>(args?: SelectSubset<T, import_logsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$import_logsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Import_logs.
     * @param {import_logsDeleteArgs} args - Arguments to delete one Import_logs.
     * @example
     * // Delete one Import_logs
     * const Import_logs = await prisma.import_logs.delete({
     *   where: {
     *     // ... filter to delete one Import_logs
     *   }
     * })
     * 
     */
    delete<T extends import_logsDeleteArgs>(args: SelectSubset<T, import_logsDeleteArgs<ExtArgs>>): Prisma__import_logsClient<$Result.GetResult<Prisma.$import_logsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Import_logs.
     * @param {import_logsUpdateArgs} args - Arguments to update one Import_logs.
     * @example
     * // Update one Import_logs
     * const import_logs = await prisma.import_logs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends import_logsUpdateArgs>(args: SelectSubset<T, import_logsUpdateArgs<ExtArgs>>): Prisma__import_logsClient<$Result.GetResult<Prisma.$import_logsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Import_logs.
     * @param {import_logsDeleteManyArgs} args - Arguments to filter Import_logs to delete.
     * @example
     * // Delete a few Import_logs
     * const { count } = await prisma.import_logs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends import_logsDeleteManyArgs>(args?: SelectSubset<T, import_logsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Import_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {import_logsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Import_logs
     * const import_logs = await prisma.import_logs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends import_logsUpdateManyArgs>(args: SelectSubset<T, import_logsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Import_logs and returns the data updated in the database.
     * @param {import_logsUpdateManyAndReturnArgs} args - Arguments to update many Import_logs.
     * @example
     * // Update many Import_logs
     * const import_logs = await prisma.import_logs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Import_logs and only return the `id`
     * const import_logsWithIdOnly = await prisma.import_logs.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends import_logsUpdateManyAndReturnArgs>(args: SelectSubset<T, import_logsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$import_logsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Import_logs.
     * @param {import_logsUpsertArgs} args - Arguments to update or create a Import_logs.
     * @example
     * // Update or create a Import_logs
     * const import_logs = await prisma.import_logs.upsert({
     *   create: {
     *     // ... data to create a Import_logs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Import_logs we want to update
     *   }
     * })
     */
    upsert<T extends import_logsUpsertArgs>(args: SelectSubset<T, import_logsUpsertArgs<ExtArgs>>): Prisma__import_logsClient<$Result.GetResult<Prisma.$import_logsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Import_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {import_logsCountArgs} args - Arguments to filter Import_logs to count.
     * @example
     * // Count the number of Import_logs
     * const count = await prisma.import_logs.count({
     *   where: {
     *     // ... the filter for the Import_logs we want to count
     *   }
     * })
    **/
    count<T extends import_logsCountArgs>(
      args?: Subset<T, import_logsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Import_logsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Import_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Import_logsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Import_logsAggregateArgs>(args: Subset<T, Import_logsAggregateArgs>): Prisma.PrismaPromise<GetImport_logsAggregateType<T>>

    /**
     * Group by Import_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {import_logsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends import_logsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: import_logsGroupByArgs['orderBy'] }
        : { orderBy?: import_logsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, import_logsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImport_logsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the import_logs model
   */
  readonly fields: import_logsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for import_logs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__import_logsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    time_entries<T extends import_logs$time_entriesArgs<ExtArgs> = {}>(args?: Subset<T, import_logs$time_entriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$time_entriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the import_logs model
   */
  interface import_logsFieldRefs {
    readonly id: FieldRef<"import_logs", 'Int'>
    readonly startDate: FieldRef<"import_logs", 'DateTime'>
    readonly endDate: FieldRef<"import_logs", 'DateTime'>
    readonly importDate: FieldRef<"import_logs", 'DateTime'>
    readonly status: FieldRef<"import_logs", 'ImportStatus'>
    readonly fileName: FieldRef<"import_logs", 'String'>
  }
    

  // Custom InputTypes
  /**
   * import_logs findUnique
   */
  export type import_logsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the import_logs
     */
    select?: import_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the import_logs
     */
    omit?: import_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: import_logsInclude<ExtArgs> | null
    /**
     * Filter, which import_logs to fetch.
     */
    where: import_logsWhereUniqueInput
  }

  /**
   * import_logs findUniqueOrThrow
   */
  export type import_logsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the import_logs
     */
    select?: import_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the import_logs
     */
    omit?: import_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: import_logsInclude<ExtArgs> | null
    /**
     * Filter, which import_logs to fetch.
     */
    where: import_logsWhereUniqueInput
  }

  /**
   * import_logs findFirst
   */
  export type import_logsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the import_logs
     */
    select?: import_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the import_logs
     */
    omit?: import_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: import_logsInclude<ExtArgs> | null
    /**
     * Filter, which import_logs to fetch.
     */
    where?: import_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of import_logs to fetch.
     */
    orderBy?: import_logsOrderByWithRelationInput | import_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for import_logs.
     */
    cursor?: import_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` import_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` import_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of import_logs.
     */
    distinct?: Import_logsScalarFieldEnum | Import_logsScalarFieldEnum[]
  }

  /**
   * import_logs findFirstOrThrow
   */
  export type import_logsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the import_logs
     */
    select?: import_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the import_logs
     */
    omit?: import_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: import_logsInclude<ExtArgs> | null
    /**
     * Filter, which import_logs to fetch.
     */
    where?: import_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of import_logs to fetch.
     */
    orderBy?: import_logsOrderByWithRelationInput | import_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for import_logs.
     */
    cursor?: import_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` import_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` import_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of import_logs.
     */
    distinct?: Import_logsScalarFieldEnum | Import_logsScalarFieldEnum[]
  }

  /**
   * import_logs findMany
   */
  export type import_logsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the import_logs
     */
    select?: import_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the import_logs
     */
    omit?: import_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: import_logsInclude<ExtArgs> | null
    /**
     * Filter, which import_logs to fetch.
     */
    where?: import_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of import_logs to fetch.
     */
    orderBy?: import_logsOrderByWithRelationInput | import_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing import_logs.
     */
    cursor?: import_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` import_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` import_logs.
     */
    skip?: number
    distinct?: Import_logsScalarFieldEnum | Import_logsScalarFieldEnum[]
  }

  /**
   * import_logs create
   */
  export type import_logsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the import_logs
     */
    select?: import_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the import_logs
     */
    omit?: import_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: import_logsInclude<ExtArgs> | null
    /**
     * The data needed to create a import_logs.
     */
    data: XOR<import_logsCreateInput, import_logsUncheckedCreateInput>
  }

  /**
   * import_logs createMany
   */
  export type import_logsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many import_logs.
     */
    data: import_logsCreateManyInput | import_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * import_logs createManyAndReturn
   */
  export type import_logsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the import_logs
     */
    select?: import_logsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the import_logs
     */
    omit?: import_logsOmit<ExtArgs> | null
    /**
     * The data used to create many import_logs.
     */
    data: import_logsCreateManyInput | import_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * import_logs update
   */
  export type import_logsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the import_logs
     */
    select?: import_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the import_logs
     */
    omit?: import_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: import_logsInclude<ExtArgs> | null
    /**
     * The data needed to update a import_logs.
     */
    data: XOR<import_logsUpdateInput, import_logsUncheckedUpdateInput>
    /**
     * Choose, which import_logs to update.
     */
    where: import_logsWhereUniqueInput
  }

  /**
   * import_logs updateMany
   */
  export type import_logsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update import_logs.
     */
    data: XOR<import_logsUpdateManyMutationInput, import_logsUncheckedUpdateManyInput>
    /**
     * Filter which import_logs to update
     */
    where?: import_logsWhereInput
    /**
     * Limit how many import_logs to update.
     */
    limit?: number
  }

  /**
   * import_logs updateManyAndReturn
   */
  export type import_logsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the import_logs
     */
    select?: import_logsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the import_logs
     */
    omit?: import_logsOmit<ExtArgs> | null
    /**
     * The data used to update import_logs.
     */
    data: XOR<import_logsUpdateManyMutationInput, import_logsUncheckedUpdateManyInput>
    /**
     * Filter which import_logs to update
     */
    where?: import_logsWhereInput
    /**
     * Limit how many import_logs to update.
     */
    limit?: number
  }

  /**
   * import_logs upsert
   */
  export type import_logsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the import_logs
     */
    select?: import_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the import_logs
     */
    omit?: import_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: import_logsInclude<ExtArgs> | null
    /**
     * The filter to search for the import_logs to update in case it exists.
     */
    where: import_logsWhereUniqueInput
    /**
     * In case the import_logs found by the `where` argument doesn't exist, create a new import_logs with this data.
     */
    create: XOR<import_logsCreateInput, import_logsUncheckedCreateInput>
    /**
     * In case the import_logs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<import_logsUpdateInput, import_logsUncheckedUpdateInput>
  }

  /**
   * import_logs delete
   */
  export type import_logsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the import_logs
     */
    select?: import_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the import_logs
     */
    omit?: import_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: import_logsInclude<ExtArgs> | null
    /**
     * Filter which import_logs to delete.
     */
    where: import_logsWhereUniqueInput
  }

  /**
   * import_logs deleteMany
   */
  export type import_logsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which import_logs to delete
     */
    where?: import_logsWhereInput
    /**
     * Limit how many import_logs to delete.
     */
    limit?: number
  }

  /**
   * import_logs.time_entries
   */
  export type import_logs$time_entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the time_entries
     */
    select?: time_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the time_entries
     */
    omit?: time_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: time_entriesInclude<ExtArgs> | null
    where?: time_entriesWhereInput
    orderBy?: time_entriesOrderByWithRelationInput | time_entriesOrderByWithRelationInput[]
    cursor?: time_entriesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Time_entriesScalarFieldEnum | Time_entriesScalarFieldEnum[]
  }

  /**
   * import_logs without action
   */
  export type import_logsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the import_logs
     */
    select?: import_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the import_logs
     */
    omit?: import_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: import_logsInclude<ExtArgs> | null
  }


  /**
   * Model time_entries
   */

  export type AggregateTime_entries = {
    _count: Time_entriesCountAggregateOutputType | null
    _avg: Time_entriesAvgAggregateOutputType | null
    _sum: Time_entriesSumAggregateOutputType | null
    _min: Time_entriesMinAggregateOutputType | null
    _max: Time_entriesMaxAggregateOutputType | null
  }

  export type Time_entriesAvgAggregateOutputType = {
    id: number | null
    employeeId: number | null
    durationDecimal: Decimal | null
    importBatchId: number | null
  }

  export type Time_entriesSumAggregateOutputType = {
    id: number | null
    employeeId: number | null
    durationDecimal: Decimal | null
    importBatchId: number | null
  }

  export type Time_entriesMinAggregateOutputType = {
    id: number | null
    employeeId: number | null
    date: Date | null
    project: string | null
    client: string | null
    description: string | null
    task: string | null
    group: string | null
    email: string | null
    startDate: Date | null
    startTime: Date | null
    endDate: Date | null
    endTime: Date | null
    hoursWorked: Date | null
    durationDecimal: Decimal | null
    uniqueEntryId: string | null
    importBatchId: number | null
  }

  export type Time_entriesMaxAggregateOutputType = {
    id: number | null
    employeeId: number | null
    date: Date | null
    project: string | null
    client: string | null
    description: string | null
    task: string | null
    group: string | null
    email: string | null
    startDate: Date | null
    startTime: Date | null
    endDate: Date | null
    endTime: Date | null
    hoursWorked: Date | null
    durationDecimal: Decimal | null
    uniqueEntryId: string | null
    importBatchId: number | null
  }

  export type Time_entriesCountAggregateOutputType = {
    id: number
    employeeId: number
    date: number
    project: number
    client: number
    description: number
    task: number
    group: number
    email: number
    startDate: number
    startTime: number
    endDate: number
    endTime: number
    hoursWorked: number
    durationDecimal: number
    uniqueEntryId: number
    importBatchId: number
    _all: number
  }


  export type Time_entriesAvgAggregateInputType = {
    id?: true
    employeeId?: true
    durationDecimal?: true
    importBatchId?: true
  }

  export type Time_entriesSumAggregateInputType = {
    id?: true
    employeeId?: true
    durationDecimal?: true
    importBatchId?: true
  }

  export type Time_entriesMinAggregateInputType = {
    id?: true
    employeeId?: true
    date?: true
    project?: true
    client?: true
    description?: true
    task?: true
    group?: true
    email?: true
    startDate?: true
    startTime?: true
    endDate?: true
    endTime?: true
    hoursWorked?: true
    durationDecimal?: true
    uniqueEntryId?: true
    importBatchId?: true
  }

  export type Time_entriesMaxAggregateInputType = {
    id?: true
    employeeId?: true
    date?: true
    project?: true
    client?: true
    description?: true
    task?: true
    group?: true
    email?: true
    startDate?: true
    startTime?: true
    endDate?: true
    endTime?: true
    hoursWorked?: true
    durationDecimal?: true
    uniqueEntryId?: true
    importBatchId?: true
  }

  export type Time_entriesCountAggregateInputType = {
    id?: true
    employeeId?: true
    date?: true
    project?: true
    client?: true
    description?: true
    task?: true
    group?: true
    email?: true
    startDate?: true
    startTime?: true
    endDate?: true
    endTime?: true
    hoursWorked?: true
    durationDecimal?: true
    uniqueEntryId?: true
    importBatchId?: true
    _all?: true
  }

  export type Time_entriesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which time_entries to aggregate.
     */
    where?: time_entriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of time_entries to fetch.
     */
    orderBy?: time_entriesOrderByWithRelationInput | time_entriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: time_entriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` time_entries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` time_entries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned time_entries
    **/
    _count?: true | Time_entriesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Time_entriesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Time_entriesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Time_entriesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Time_entriesMaxAggregateInputType
  }

  export type GetTime_entriesAggregateType<T extends Time_entriesAggregateArgs> = {
        [P in keyof T & keyof AggregateTime_entries]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTime_entries[P]>
      : GetScalarType<T[P], AggregateTime_entries[P]>
  }




  export type time_entriesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: time_entriesWhereInput
    orderBy?: time_entriesOrderByWithAggregationInput | time_entriesOrderByWithAggregationInput[]
    by: Time_entriesScalarFieldEnum[] | Time_entriesScalarFieldEnum
    having?: time_entriesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Time_entriesCountAggregateInputType | true
    _avg?: Time_entriesAvgAggregateInputType
    _sum?: Time_entriesSumAggregateInputType
    _min?: Time_entriesMinAggregateInputType
    _max?: Time_entriesMaxAggregateInputType
  }

  export type Time_entriesGroupByOutputType = {
    id: number
    employeeId: number
    date: Date
    project: string
    client: string | null
    description: string | null
    task: string | null
    group: string | null
    email: string | null
    startDate: Date
    startTime: Date
    endDate: Date
    endTime: Date
    hoursWorked: Date
    durationDecimal: Decimal | null
    uniqueEntryId: string
    importBatchId: number
    _count: Time_entriesCountAggregateOutputType | null
    _avg: Time_entriesAvgAggregateOutputType | null
    _sum: Time_entriesSumAggregateOutputType | null
    _min: Time_entriesMinAggregateOutputType | null
    _max: Time_entriesMaxAggregateOutputType | null
  }

  type GetTime_entriesGroupByPayload<T extends time_entriesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Time_entriesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Time_entriesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Time_entriesGroupByOutputType[P]>
            : GetScalarType<T[P], Time_entriesGroupByOutputType[P]>
        }
      >
    >


  export type time_entriesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    date?: boolean
    project?: boolean
    client?: boolean
    description?: boolean
    task?: boolean
    group?: boolean
    email?: boolean
    startDate?: boolean
    startTime?: boolean
    endDate?: boolean
    endTime?: boolean
    hoursWorked?: boolean
    durationDecimal?: boolean
    uniqueEntryId?: boolean
    importBatchId?: boolean
    employee?: boolean | employeesDefaultArgs<ExtArgs>
    import_log?: boolean | import_logsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["time_entries"]>

  export type time_entriesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    date?: boolean
    project?: boolean
    client?: boolean
    description?: boolean
    task?: boolean
    group?: boolean
    email?: boolean
    startDate?: boolean
    startTime?: boolean
    endDate?: boolean
    endTime?: boolean
    hoursWorked?: boolean
    durationDecimal?: boolean
    uniqueEntryId?: boolean
    importBatchId?: boolean
    employee?: boolean | employeesDefaultArgs<ExtArgs>
    import_log?: boolean | import_logsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["time_entries"]>

  export type time_entriesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    date?: boolean
    project?: boolean
    client?: boolean
    description?: boolean
    task?: boolean
    group?: boolean
    email?: boolean
    startDate?: boolean
    startTime?: boolean
    endDate?: boolean
    endTime?: boolean
    hoursWorked?: boolean
    durationDecimal?: boolean
    uniqueEntryId?: boolean
    importBatchId?: boolean
    employee?: boolean | employeesDefaultArgs<ExtArgs>
    import_log?: boolean | import_logsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["time_entries"]>

  export type time_entriesSelectScalar = {
    id?: boolean
    employeeId?: boolean
    date?: boolean
    project?: boolean
    client?: boolean
    description?: boolean
    task?: boolean
    group?: boolean
    email?: boolean
    startDate?: boolean
    startTime?: boolean
    endDate?: boolean
    endTime?: boolean
    hoursWorked?: boolean
    durationDecimal?: boolean
    uniqueEntryId?: boolean
    importBatchId?: boolean
  }

  export type time_entriesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employeeId" | "date" | "project" | "client" | "description" | "task" | "group" | "email" | "startDate" | "startTime" | "endDate" | "endTime" | "hoursWorked" | "durationDecimal" | "uniqueEntryId" | "importBatchId", ExtArgs["result"]["time_entries"]>
  export type time_entriesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | employeesDefaultArgs<ExtArgs>
    import_log?: boolean | import_logsDefaultArgs<ExtArgs>
  }
  export type time_entriesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | employeesDefaultArgs<ExtArgs>
    import_log?: boolean | import_logsDefaultArgs<ExtArgs>
  }
  export type time_entriesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | employeesDefaultArgs<ExtArgs>
    import_log?: boolean | import_logsDefaultArgs<ExtArgs>
  }

  export type $time_entriesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "time_entries"
    objects: {
      employee: Prisma.$employeesPayload<ExtArgs>
      import_log: Prisma.$import_logsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      employeeId: number
      date: Date
      project: string
      client: string | null
      description: string | null
      task: string | null
      group: string | null
      email: string | null
      startDate: Date
      startTime: Date
      endDate: Date
      endTime: Date
      hoursWorked: Date
      durationDecimal: Prisma.Decimal | null
      uniqueEntryId: string
      importBatchId: number
    }, ExtArgs["result"]["time_entries"]>
    composites: {}
  }

  type time_entriesGetPayload<S extends boolean | null | undefined | time_entriesDefaultArgs> = $Result.GetResult<Prisma.$time_entriesPayload, S>

  type time_entriesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<time_entriesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Time_entriesCountAggregateInputType | true
    }

  export interface time_entriesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['time_entries'], meta: { name: 'time_entries' } }
    /**
     * Find zero or one Time_entries that matches the filter.
     * @param {time_entriesFindUniqueArgs} args - Arguments to find a Time_entries
     * @example
     * // Get one Time_entries
     * const time_entries = await prisma.time_entries.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends time_entriesFindUniqueArgs>(args: SelectSubset<T, time_entriesFindUniqueArgs<ExtArgs>>): Prisma__time_entriesClient<$Result.GetResult<Prisma.$time_entriesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Time_entries that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {time_entriesFindUniqueOrThrowArgs} args - Arguments to find a Time_entries
     * @example
     * // Get one Time_entries
     * const time_entries = await prisma.time_entries.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends time_entriesFindUniqueOrThrowArgs>(args: SelectSubset<T, time_entriesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__time_entriesClient<$Result.GetResult<Prisma.$time_entriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Time_entries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {time_entriesFindFirstArgs} args - Arguments to find a Time_entries
     * @example
     * // Get one Time_entries
     * const time_entries = await prisma.time_entries.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends time_entriesFindFirstArgs>(args?: SelectSubset<T, time_entriesFindFirstArgs<ExtArgs>>): Prisma__time_entriesClient<$Result.GetResult<Prisma.$time_entriesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Time_entries that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {time_entriesFindFirstOrThrowArgs} args - Arguments to find a Time_entries
     * @example
     * // Get one Time_entries
     * const time_entries = await prisma.time_entries.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends time_entriesFindFirstOrThrowArgs>(args?: SelectSubset<T, time_entriesFindFirstOrThrowArgs<ExtArgs>>): Prisma__time_entriesClient<$Result.GetResult<Prisma.$time_entriesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Time_entries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {time_entriesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Time_entries
     * const time_entries = await prisma.time_entries.findMany()
     * 
     * // Get first 10 Time_entries
     * const time_entries = await prisma.time_entries.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const time_entriesWithIdOnly = await prisma.time_entries.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends time_entriesFindManyArgs>(args?: SelectSubset<T, time_entriesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$time_entriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Time_entries.
     * @param {time_entriesCreateArgs} args - Arguments to create a Time_entries.
     * @example
     * // Create one Time_entries
     * const Time_entries = await prisma.time_entries.create({
     *   data: {
     *     // ... data to create a Time_entries
     *   }
     * })
     * 
     */
    create<T extends time_entriesCreateArgs>(args: SelectSubset<T, time_entriesCreateArgs<ExtArgs>>): Prisma__time_entriesClient<$Result.GetResult<Prisma.$time_entriesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Time_entries.
     * @param {time_entriesCreateManyArgs} args - Arguments to create many Time_entries.
     * @example
     * // Create many Time_entries
     * const time_entries = await prisma.time_entries.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends time_entriesCreateManyArgs>(args?: SelectSubset<T, time_entriesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Time_entries and returns the data saved in the database.
     * @param {time_entriesCreateManyAndReturnArgs} args - Arguments to create many Time_entries.
     * @example
     * // Create many Time_entries
     * const time_entries = await prisma.time_entries.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Time_entries and only return the `id`
     * const time_entriesWithIdOnly = await prisma.time_entries.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends time_entriesCreateManyAndReturnArgs>(args?: SelectSubset<T, time_entriesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$time_entriesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Time_entries.
     * @param {time_entriesDeleteArgs} args - Arguments to delete one Time_entries.
     * @example
     * // Delete one Time_entries
     * const Time_entries = await prisma.time_entries.delete({
     *   where: {
     *     // ... filter to delete one Time_entries
     *   }
     * })
     * 
     */
    delete<T extends time_entriesDeleteArgs>(args: SelectSubset<T, time_entriesDeleteArgs<ExtArgs>>): Prisma__time_entriesClient<$Result.GetResult<Prisma.$time_entriesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Time_entries.
     * @param {time_entriesUpdateArgs} args - Arguments to update one Time_entries.
     * @example
     * // Update one Time_entries
     * const time_entries = await prisma.time_entries.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends time_entriesUpdateArgs>(args: SelectSubset<T, time_entriesUpdateArgs<ExtArgs>>): Prisma__time_entriesClient<$Result.GetResult<Prisma.$time_entriesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Time_entries.
     * @param {time_entriesDeleteManyArgs} args - Arguments to filter Time_entries to delete.
     * @example
     * // Delete a few Time_entries
     * const { count } = await prisma.time_entries.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends time_entriesDeleteManyArgs>(args?: SelectSubset<T, time_entriesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Time_entries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {time_entriesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Time_entries
     * const time_entries = await prisma.time_entries.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends time_entriesUpdateManyArgs>(args: SelectSubset<T, time_entriesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Time_entries and returns the data updated in the database.
     * @param {time_entriesUpdateManyAndReturnArgs} args - Arguments to update many Time_entries.
     * @example
     * // Update many Time_entries
     * const time_entries = await prisma.time_entries.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Time_entries and only return the `id`
     * const time_entriesWithIdOnly = await prisma.time_entries.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends time_entriesUpdateManyAndReturnArgs>(args: SelectSubset<T, time_entriesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$time_entriesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Time_entries.
     * @param {time_entriesUpsertArgs} args - Arguments to update or create a Time_entries.
     * @example
     * // Update or create a Time_entries
     * const time_entries = await prisma.time_entries.upsert({
     *   create: {
     *     // ... data to create a Time_entries
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Time_entries we want to update
     *   }
     * })
     */
    upsert<T extends time_entriesUpsertArgs>(args: SelectSubset<T, time_entriesUpsertArgs<ExtArgs>>): Prisma__time_entriesClient<$Result.GetResult<Prisma.$time_entriesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Time_entries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {time_entriesCountArgs} args - Arguments to filter Time_entries to count.
     * @example
     * // Count the number of Time_entries
     * const count = await prisma.time_entries.count({
     *   where: {
     *     // ... the filter for the Time_entries we want to count
     *   }
     * })
    **/
    count<T extends time_entriesCountArgs>(
      args?: Subset<T, time_entriesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Time_entriesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Time_entries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Time_entriesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Time_entriesAggregateArgs>(args: Subset<T, Time_entriesAggregateArgs>): Prisma.PrismaPromise<GetTime_entriesAggregateType<T>>

    /**
     * Group by Time_entries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {time_entriesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends time_entriesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: time_entriesGroupByArgs['orderBy'] }
        : { orderBy?: time_entriesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, time_entriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTime_entriesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the time_entries model
   */
  readonly fields: time_entriesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for time_entries.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__time_entriesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends employeesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, employeesDefaultArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    import_log<T extends import_logsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, import_logsDefaultArgs<ExtArgs>>): Prisma__import_logsClient<$Result.GetResult<Prisma.$import_logsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the time_entries model
   */
  interface time_entriesFieldRefs {
    readonly id: FieldRef<"time_entries", 'Int'>
    readonly employeeId: FieldRef<"time_entries", 'Int'>
    readonly date: FieldRef<"time_entries", 'DateTime'>
    readonly project: FieldRef<"time_entries", 'String'>
    readonly client: FieldRef<"time_entries", 'String'>
    readonly description: FieldRef<"time_entries", 'String'>
    readonly task: FieldRef<"time_entries", 'String'>
    readonly group: FieldRef<"time_entries", 'String'>
    readonly email: FieldRef<"time_entries", 'String'>
    readonly startDate: FieldRef<"time_entries", 'DateTime'>
    readonly startTime: FieldRef<"time_entries", 'DateTime'>
    readonly endDate: FieldRef<"time_entries", 'DateTime'>
    readonly endTime: FieldRef<"time_entries", 'DateTime'>
    readonly hoursWorked: FieldRef<"time_entries", 'DateTime'>
    readonly durationDecimal: FieldRef<"time_entries", 'Decimal'>
    readonly uniqueEntryId: FieldRef<"time_entries", 'String'>
    readonly importBatchId: FieldRef<"time_entries", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * time_entries findUnique
   */
  export type time_entriesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the time_entries
     */
    select?: time_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the time_entries
     */
    omit?: time_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: time_entriesInclude<ExtArgs> | null
    /**
     * Filter, which time_entries to fetch.
     */
    where: time_entriesWhereUniqueInput
  }

  /**
   * time_entries findUniqueOrThrow
   */
  export type time_entriesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the time_entries
     */
    select?: time_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the time_entries
     */
    omit?: time_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: time_entriesInclude<ExtArgs> | null
    /**
     * Filter, which time_entries to fetch.
     */
    where: time_entriesWhereUniqueInput
  }

  /**
   * time_entries findFirst
   */
  export type time_entriesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the time_entries
     */
    select?: time_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the time_entries
     */
    omit?: time_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: time_entriesInclude<ExtArgs> | null
    /**
     * Filter, which time_entries to fetch.
     */
    where?: time_entriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of time_entries to fetch.
     */
    orderBy?: time_entriesOrderByWithRelationInput | time_entriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for time_entries.
     */
    cursor?: time_entriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` time_entries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` time_entries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of time_entries.
     */
    distinct?: Time_entriesScalarFieldEnum | Time_entriesScalarFieldEnum[]
  }

  /**
   * time_entries findFirstOrThrow
   */
  export type time_entriesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the time_entries
     */
    select?: time_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the time_entries
     */
    omit?: time_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: time_entriesInclude<ExtArgs> | null
    /**
     * Filter, which time_entries to fetch.
     */
    where?: time_entriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of time_entries to fetch.
     */
    orderBy?: time_entriesOrderByWithRelationInput | time_entriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for time_entries.
     */
    cursor?: time_entriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` time_entries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` time_entries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of time_entries.
     */
    distinct?: Time_entriesScalarFieldEnum | Time_entriesScalarFieldEnum[]
  }

  /**
   * time_entries findMany
   */
  export type time_entriesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the time_entries
     */
    select?: time_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the time_entries
     */
    omit?: time_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: time_entriesInclude<ExtArgs> | null
    /**
     * Filter, which time_entries to fetch.
     */
    where?: time_entriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of time_entries to fetch.
     */
    orderBy?: time_entriesOrderByWithRelationInput | time_entriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing time_entries.
     */
    cursor?: time_entriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` time_entries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` time_entries.
     */
    skip?: number
    distinct?: Time_entriesScalarFieldEnum | Time_entriesScalarFieldEnum[]
  }

  /**
   * time_entries create
   */
  export type time_entriesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the time_entries
     */
    select?: time_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the time_entries
     */
    omit?: time_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: time_entriesInclude<ExtArgs> | null
    /**
     * The data needed to create a time_entries.
     */
    data: XOR<time_entriesCreateInput, time_entriesUncheckedCreateInput>
  }

  /**
   * time_entries createMany
   */
  export type time_entriesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many time_entries.
     */
    data: time_entriesCreateManyInput | time_entriesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * time_entries createManyAndReturn
   */
  export type time_entriesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the time_entries
     */
    select?: time_entriesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the time_entries
     */
    omit?: time_entriesOmit<ExtArgs> | null
    /**
     * The data used to create many time_entries.
     */
    data: time_entriesCreateManyInput | time_entriesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: time_entriesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * time_entries update
   */
  export type time_entriesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the time_entries
     */
    select?: time_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the time_entries
     */
    omit?: time_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: time_entriesInclude<ExtArgs> | null
    /**
     * The data needed to update a time_entries.
     */
    data: XOR<time_entriesUpdateInput, time_entriesUncheckedUpdateInput>
    /**
     * Choose, which time_entries to update.
     */
    where: time_entriesWhereUniqueInput
  }

  /**
   * time_entries updateMany
   */
  export type time_entriesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update time_entries.
     */
    data: XOR<time_entriesUpdateManyMutationInput, time_entriesUncheckedUpdateManyInput>
    /**
     * Filter which time_entries to update
     */
    where?: time_entriesWhereInput
    /**
     * Limit how many time_entries to update.
     */
    limit?: number
  }

  /**
   * time_entries updateManyAndReturn
   */
  export type time_entriesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the time_entries
     */
    select?: time_entriesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the time_entries
     */
    omit?: time_entriesOmit<ExtArgs> | null
    /**
     * The data used to update time_entries.
     */
    data: XOR<time_entriesUpdateManyMutationInput, time_entriesUncheckedUpdateManyInput>
    /**
     * Filter which time_entries to update
     */
    where?: time_entriesWhereInput
    /**
     * Limit how many time_entries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: time_entriesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * time_entries upsert
   */
  export type time_entriesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the time_entries
     */
    select?: time_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the time_entries
     */
    omit?: time_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: time_entriesInclude<ExtArgs> | null
    /**
     * The filter to search for the time_entries to update in case it exists.
     */
    where: time_entriesWhereUniqueInput
    /**
     * In case the time_entries found by the `where` argument doesn't exist, create a new time_entries with this data.
     */
    create: XOR<time_entriesCreateInput, time_entriesUncheckedCreateInput>
    /**
     * In case the time_entries was found with the provided `where` argument, update it with this data.
     */
    update: XOR<time_entriesUpdateInput, time_entriesUncheckedUpdateInput>
  }

  /**
   * time_entries delete
   */
  export type time_entriesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the time_entries
     */
    select?: time_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the time_entries
     */
    omit?: time_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: time_entriesInclude<ExtArgs> | null
    /**
     * Filter which time_entries to delete.
     */
    where: time_entriesWhereUniqueInput
  }

  /**
   * time_entries deleteMany
   */
  export type time_entriesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which time_entries to delete
     */
    where?: time_entriesWhereInput
    /**
     * Limit how many time_entries to delete.
     */
    limit?: number
  }

  /**
   * time_entries without action
   */
  export type time_entriesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the time_entries
     */
    select?: time_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the time_entries
     */
    omit?: time_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: time_entriesInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsersScalarFieldEnum: {
    id: 'id',
    username: 'username',
    passwordHash: 'passwordHash',
    name: 'name',
    email: 'email',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const EmployeesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    position: 'position',
    department: 'department',
    employmentType: 'employmentType',
    weeklyCommittedHours: 'weeklyCommittedHours',
    startDate: 'startDate',
    joinDate: 'joinDate',
    isActive: 'isActive',
    clockifyName: 'clockifyName',
    bio: 'bio',
    avatarUrl: 'avatarUrl'
  };

  export type EmployeesScalarFieldEnum = (typeof EmployeesScalarFieldEnum)[keyof typeof EmployeesScalarFieldEnum]


  export const Import_logsScalarFieldEnum: {
    id: 'id',
    startDate: 'startDate',
    endDate: 'endDate',
    importDate: 'importDate',
    status: 'status',
    fileName: 'fileName'
  };

  export type Import_logsScalarFieldEnum = (typeof Import_logsScalarFieldEnum)[keyof typeof Import_logsScalarFieldEnum]


  export const Time_entriesScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    date: 'date',
    project: 'project',
    client: 'client',
    description: 'description',
    task: 'task',
    group: 'group',
    email: 'email',
    startDate: 'startDate',
    startTime: 'startTime',
    endDate: 'endDate',
    endTime: 'endTime',
    hoursWorked: 'hoursWorked',
    durationDecimal: 'durationDecimal',
    uniqueEntryId: 'uniqueEntryId',
    importBatchId: 'importBatchId'
  };

  export type Time_entriesScalarFieldEnum = (typeof Time_entriesScalarFieldEnum)[keyof typeof Time_entriesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'EmploymentType'
   */
  export type EnumEmploymentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmploymentType'>
    


  /**
   * Reference to a field of type 'EmploymentType[]'
   */
  export type ListEnumEmploymentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmploymentType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ImportStatus'
   */
  export type EnumImportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ImportStatus'>
    


  /**
   * Reference to a field of type 'ImportStatus[]'
   */
  export type ListEnumImportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ImportStatus[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: IntFilter<"users"> | number
    username?: StringFilter<"users"> | string
    passwordHash?: StringFilter<"users"> | string
    name?: StringNullableFilter<"users"> | string | null
    email?: StringNullableFilter<"users"> | string | null
    role?: StringFilter<"users"> | string
    createdAt?: DateTimeFilter<"users"> | Date | string
    updatedAt?: DateTimeFilter<"users"> | Date | string
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    passwordHash?: StringFilter<"users"> | string
    name?: StringNullableFilter<"users"> | string | null
    email?: StringNullableFilter<"users"> | string | null
    role?: StringFilter<"users"> | string
    createdAt?: DateTimeFilter<"users"> | Date | string
    updatedAt?: DateTimeFilter<"users"> | Date | string
  }, "id" | "username">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"users"> | number
    username?: StringWithAggregatesFilter<"users"> | string
    passwordHash?: StringWithAggregatesFilter<"users"> | string
    name?: StringNullableWithAggregatesFilter<"users"> | string | null
    email?: StringNullableWithAggregatesFilter<"users"> | string | null
    role?: StringWithAggregatesFilter<"users"> | string
    createdAt?: DateTimeWithAggregatesFilter<"users"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"users"> | Date | string
  }

  export type employeesWhereInput = {
    AND?: employeesWhereInput | employeesWhereInput[]
    OR?: employeesWhereInput[]
    NOT?: employeesWhereInput | employeesWhereInput[]
    id?: IntFilter<"employees"> | number
    name?: StringFilter<"employees"> | string
    email?: StringFilter<"employees"> | string
    phone?: StringNullableFilter<"employees"> | string | null
    position?: StringNullableFilter<"employees"> | string | null
    department?: StringFilter<"employees"> | string
    employmentType?: EnumEmploymentTypeFilter<"employees"> | $Enums.EmploymentType
    weeklyCommittedHours?: IntFilter<"employees"> | number
    startDate?: DateTimeFilter<"employees"> | Date | string
    joinDate?: DateTimeNullableFilter<"employees"> | Date | string | null
    isActive?: BoolFilter<"employees"> | boolean
    clockifyName?: StringNullableFilter<"employees"> | string | null
    bio?: StringNullableFilter<"employees"> | string | null
    avatarUrl?: StringNullableFilter<"employees"> | string | null
    time_entries?: Time_entriesListRelationFilter
  }

  export type employeesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    department?: SortOrder
    employmentType?: SortOrder
    weeklyCommittedHours?: SortOrder
    startDate?: SortOrder
    joinDate?: SortOrderInput | SortOrder
    isActive?: SortOrder
    clockifyName?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    time_entries?: time_entriesOrderByRelationAggregateInput
  }

  export type employeesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: employeesWhereInput | employeesWhereInput[]
    OR?: employeesWhereInput[]
    NOT?: employeesWhereInput | employeesWhereInput[]
    name?: StringFilter<"employees"> | string
    phone?: StringNullableFilter<"employees"> | string | null
    position?: StringNullableFilter<"employees"> | string | null
    department?: StringFilter<"employees"> | string
    employmentType?: EnumEmploymentTypeFilter<"employees"> | $Enums.EmploymentType
    weeklyCommittedHours?: IntFilter<"employees"> | number
    startDate?: DateTimeFilter<"employees"> | Date | string
    joinDate?: DateTimeNullableFilter<"employees"> | Date | string | null
    isActive?: BoolFilter<"employees"> | boolean
    clockifyName?: StringNullableFilter<"employees"> | string | null
    bio?: StringNullableFilter<"employees"> | string | null
    avatarUrl?: StringNullableFilter<"employees"> | string | null
    time_entries?: Time_entriesListRelationFilter
  }, "id" | "email">

  export type employeesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    department?: SortOrder
    employmentType?: SortOrder
    weeklyCommittedHours?: SortOrder
    startDate?: SortOrder
    joinDate?: SortOrderInput | SortOrder
    isActive?: SortOrder
    clockifyName?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    _count?: employeesCountOrderByAggregateInput
    _avg?: employeesAvgOrderByAggregateInput
    _max?: employeesMaxOrderByAggregateInput
    _min?: employeesMinOrderByAggregateInput
    _sum?: employeesSumOrderByAggregateInput
  }

  export type employeesScalarWhereWithAggregatesInput = {
    AND?: employeesScalarWhereWithAggregatesInput | employeesScalarWhereWithAggregatesInput[]
    OR?: employeesScalarWhereWithAggregatesInput[]
    NOT?: employeesScalarWhereWithAggregatesInput | employeesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"employees"> | number
    name?: StringWithAggregatesFilter<"employees"> | string
    email?: StringWithAggregatesFilter<"employees"> | string
    phone?: StringNullableWithAggregatesFilter<"employees"> | string | null
    position?: StringNullableWithAggregatesFilter<"employees"> | string | null
    department?: StringWithAggregatesFilter<"employees"> | string
    employmentType?: EnumEmploymentTypeWithAggregatesFilter<"employees"> | $Enums.EmploymentType
    weeklyCommittedHours?: IntWithAggregatesFilter<"employees"> | number
    startDate?: DateTimeWithAggregatesFilter<"employees"> | Date | string
    joinDate?: DateTimeNullableWithAggregatesFilter<"employees"> | Date | string | null
    isActive?: BoolWithAggregatesFilter<"employees"> | boolean
    clockifyName?: StringNullableWithAggregatesFilter<"employees"> | string | null
    bio?: StringNullableWithAggregatesFilter<"employees"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"employees"> | string | null
  }

  export type import_logsWhereInput = {
    AND?: import_logsWhereInput | import_logsWhereInput[]
    OR?: import_logsWhereInput[]
    NOT?: import_logsWhereInput | import_logsWhereInput[]
    id?: IntFilter<"import_logs"> | number
    startDate?: DateTimeFilter<"import_logs"> | Date | string
    endDate?: DateTimeFilter<"import_logs"> | Date | string
    importDate?: DateTimeFilter<"import_logs"> | Date | string
    status?: EnumImportStatusFilter<"import_logs"> | $Enums.ImportStatus
    fileName?: StringFilter<"import_logs"> | string
    time_entries?: Time_entriesListRelationFilter
  }

  export type import_logsOrderByWithRelationInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    importDate?: SortOrder
    status?: SortOrder
    fileName?: SortOrder
    time_entries?: time_entriesOrderByRelationAggregateInput
  }

  export type import_logsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: import_logsWhereInput | import_logsWhereInput[]
    OR?: import_logsWhereInput[]
    NOT?: import_logsWhereInput | import_logsWhereInput[]
    startDate?: DateTimeFilter<"import_logs"> | Date | string
    endDate?: DateTimeFilter<"import_logs"> | Date | string
    importDate?: DateTimeFilter<"import_logs"> | Date | string
    status?: EnumImportStatusFilter<"import_logs"> | $Enums.ImportStatus
    fileName?: StringFilter<"import_logs"> | string
    time_entries?: Time_entriesListRelationFilter
  }, "id">

  export type import_logsOrderByWithAggregationInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    importDate?: SortOrder
    status?: SortOrder
    fileName?: SortOrder
    _count?: import_logsCountOrderByAggregateInput
    _avg?: import_logsAvgOrderByAggregateInput
    _max?: import_logsMaxOrderByAggregateInput
    _min?: import_logsMinOrderByAggregateInput
    _sum?: import_logsSumOrderByAggregateInput
  }

  export type import_logsScalarWhereWithAggregatesInput = {
    AND?: import_logsScalarWhereWithAggregatesInput | import_logsScalarWhereWithAggregatesInput[]
    OR?: import_logsScalarWhereWithAggregatesInput[]
    NOT?: import_logsScalarWhereWithAggregatesInput | import_logsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"import_logs"> | number
    startDate?: DateTimeWithAggregatesFilter<"import_logs"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"import_logs"> | Date | string
    importDate?: DateTimeWithAggregatesFilter<"import_logs"> | Date | string
    status?: EnumImportStatusWithAggregatesFilter<"import_logs"> | $Enums.ImportStatus
    fileName?: StringWithAggregatesFilter<"import_logs"> | string
  }

  export type time_entriesWhereInput = {
    AND?: time_entriesWhereInput | time_entriesWhereInput[]
    OR?: time_entriesWhereInput[]
    NOT?: time_entriesWhereInput | time_entriesWhereInput[]
    id?: IntFilter<"time_entries"> | number
    employeeId?: IntFilter<"time_entries"> | number
    date?: DateTimeFilter<"time_entries"> | Date | string
    project?: StringFilter<"time_entries"> | string
    client?: StringNullableFilter<"time_entries"> | string | null
    description?: StringNullableFilter<"time_entries"> | string | null
    task?: StringNullableFilter<"time_entries"> | string | null
    group?: StringNullableFilter<"time_entries"> | string | null
    email?: StringNullableFilter<"time_entries"> | string | null
    startDate?: DateTimeFilter<"time_entries"> | Date | string
    startTime?: DateTimeFilter<"time_entries"> | Date | string
    endDate?: DateTimeFilter<"time_entries"> | Date | string
    endTime?: DateTimeFilter<"time_entries"> | Date | string
    hoursWorked?: DateTimeFilter<"time_entries"> | Date | string
    durationDecimal?: DecimalNullableFilter<"time_entries"> | Decimal | DecimalJsLike | number | string | null
    uniqueEntryId?: StringFilter<"time_entries"> | string
    importBatchId?: IntFilter<"time_entries"> | number
    employee?: XOR<EmployeesScalarRelationFilter, employeesWhereInput>
    import_log?: XOR<Import_logsScalarRelationFilter, import_logsWhereInput>
  }

  export type time_entriesOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    project?: SortOrder
    client?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    task?: SortOrderInput | SortOrder
    group?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    startDate?: SortOrder
    startTime?: SortOrder
    endDate?: SortOrder
    endTime?: SortOrder
    hoursWorked?: SortOrder
    durationDecimal?: SortOrderInput | SortOrder
    uniqueEntryId?: SortOrder
    importBatchId?: SortOrder
    employee?: employeesOrderByWithRelationInput
    import_log?: import_logsOrderByWithRelationInput
  }

  export type time_entriesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uniqueEntryId?: string
    AND?: time_entriesWhereInput | time_entriesWhereInput[]
    OR?: time_entriesWhereInput[]
    NOT?: time_entriesWhereInput | time_entriesWhereInput[]
    employeeId?: IntFilter<"time_entries"> | number
    date?: DateTimeFilter<"time_entries"> | Date | string
    project?: StringFilter<"time_entries"> | string
    client?: StringNullableFilter<"time_entries"> | string | null
    description?: StringNullableFilter<"time_entries"> | string | null
    task?: StringNullableFilter<"time_entries"> | string | null
    group?: StringNullableFilter<"time_entries"> | string | null
    email?: StringNullableFilter<"time_entries"> | string | null
    startDate?: DateTimeFilter<"time_entries"> | Date | string
    startTime?: DateTimeFilter<"time_entries"> | Date | string
    endDate?: DateTimeFilter<"time_entries"> | Date | string
    endTime?: DateTimeFilter<"time_entries"> | Date | string
    hoursWorked?: DateTimeFilter<"time_entries"> | Date | string
    durationDecimal?: DecimalNullableFilter<"time_entries"> | Decimal | DecimalJsLike | number | string | null
    importBatchId?: IntFilter<"time_entries"> | number
    employee?: XOR<EmployeesScalarRelationFilter, employeesWhereInput>
    import_log?: XOR<Import_logsScalarRelationFilter, import_logsWhereInput>
  }, "id" | "uniqueEntryId">

  export type time_entriesOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    project?: SortOrder
    client?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    task?: SortOrderInput | SortOrder
    group?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    startDate?: SortOrder
    startTime?: SortOrder
    endDate?: SortOrder
    endTime?: SortOrder
    hoursWorked?: SortOrder
    durationDecimal?: SortOrderInput | SortOrder
    uniqueEntryId?: SortOrder
    importBatchId?: SortOrder
    _count?: time_entriesCountOrderByAggregateInput
    _avg?: time_entriesAvgOrderByAggregateInput
    _max?: time_entriesMaxOrderByAggregateInput
    _min?: time_entriesMinOrderByAggregateInput
    _sum?: time_entriesSumOrderByAggregateInput
  }

  export type time_entriesScalarWhereWithAggregatesInput = {
    AND?: time_entriesScalarWhereWithAggregatesInput | time_entriesScalarWhereWithAggregatesInput[]
    OR?: time_entriesScalarWhereWithAggregatesInput[]
    NOT?: time_entriesScalarWhereWithAggregatesInput | time_entriesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"time_entries"> | number
    employeeId?: IntWithAggregatesFilter<"time_entries"> | number
    date?: DateTimeWithAggregatesFilter<"time_entries"> | Date | string
    project?: StringWithAggregatesFilter<"time_entries"> | string
    client?: StringNullableWithAggregatesFilter<"time_entries"> | string | null
    description?: StringNullableWithAggregatesFilter<"time_entries"> | string | null
    task?: StringNullableWithAggregatesFilter<"time_entries"> | string | null
    group?: StringNullableWithAggregatesFilter<"time_entries"> | string | null
    email?: StringNullableWithAggregatesFilter<"time_entries"> | string | null
    startDate?: DateTimeWithAggregatesFilter<"time_entries"> | Date | string
    startTime?: DateTimeWithAggregatesFilter<"time_entries"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"time_entries"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"time_entries"> | Date | string
    hoursWorked?: DateTimeWithAggregatesFilter<"time_entries"> | Date | string
    durationDecimal?: DecimalNullableWithAggregatesFilter<"time_entries"> | Decimal | DecimalJsLike | number | string | null
    uniqueEntryId?: StringWithAggregatesFilter<"time_entries"> | string
    importBatchId?: IntWithAggregatesFilter<"time_entries"> | number
  }

  export type usersCreateInput = {
    username: string
    passwordHash: string
    name?: string | null
    email?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type usersUncheckedCreateInput = {
    id?: number
    username: string
    passwordHash: string
    name?: string | null
    email?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type usersUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersCreateManyInput = {
    id?: number
    username: string
    passwordHash: string
    name?: string | null
    email?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type usersUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type employeesCreateInput = {
    name: string
    email: string
    phone?: string | null
    position?: string | null
    department: string
    employmentType: $Enums.EmploymentType
    weeklyCommittedHours: number
    startDate: Date | string
    joinDate?: Date | string | null
    isActive?: boolean
    clockifyName?: string | null
    bio?: string | null
    avatarUrl?: string | null
    time_entries?: time_entriesCreateNestedManyWithoutEmployeeInput
  }

  export type employeesUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    position?: string | null
    department: string
    employmentType: $Enums.EmploymentType
    weeklyCommittedHours: number
    startDate: Date | string
    joinDate?: Date | string | null
    isActive?: boolean
    clockifyName?: string | null
    bio?: string | null
    avatarUrl?: string | null
    time_entries?: time_entriesUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type employeesUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    employmentType?: EnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType
    weeklyCommittedHours?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    joinDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    clockifyName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    time_entries?: time_entriesUpdateManyWithoutEmployeeNestedInput
  }

  export type employeesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    employmentType?: EnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType
    weeklyCommittedHours?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    joinDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    clockifyName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    time_entries?: time_entriesUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type employeesCreateManyInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    position?: string | null
    department: string
    employmentType: $Enums.EmploymentType
    weeklyCommittedHours: number
    startDate: Date | string
    joinDate?: Date | string | null
    isActive?: boolean
    clockifyName?: string | null
    bio?: string | null
    avatarUrl?: string | null
  }

  export type employeesUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    employmentType?: EnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType
    weeklyCommittedHours?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    joinDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    clockifyName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type employeesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    employmentType?: EnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType
    weeklyCommittedHours?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    joinDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    clockifyName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type import_logsCreateInput = {
    startDate: Date | string
    endDate: Date | string
    importDate?: Date | string
    status: $Enums.ImportStatus
    fileName: string
    time_entries?: time_entriesCreateNestedManyWithoutImport_logInput
  }

  export type import_logsUncheckedCreateInput = {
    id?: number
    startDate: Date | string
    endDate: Date | string
    importDate?: Date | string
    status: $Enums.ImportStatus
    fileName: string
    time_entries?: time_entriesUncheckedCreateNestedManyWithoutImport_logInput
  }

  export type import_logsUpdateInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    importDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumImportStatusFieldUpdateOperationsInput | $Enums.ImportStatus
    fileName?: StringFieldUpdateOperationsInput | string
    time_entries?: time_entriesUpdateManyWithoutImport_logNestedInput
  }

  export type import_logsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    importDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumImportStatusFieldUpdateOperationsInput | $Enums.ImportStatus
    fileName?: StringFieldUpdateOperationsInput | string
    time_entries?: time_entriesUncheckedUpdateManyWithoutImport_logNestedInput
  }

  export type import_logsCreateManyInput = {
    id?: number
    startDate: Date | string
    endDate: Date | string
    importDate?: Date | string
    status: $Enums.ImportStatus
    fileName: string
  }

  export type import_logsUpdateManyMutationInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    importDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumImportStatusFieldUpdateOperationsInput | $Enums.ImportStatus
    fileName?: StringFieldUpdateOperationsInput | string
  }

  export type import_logsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    importDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumImportStatusFieldUpdateOperationsInput | $Enums.ImportStatus
    fileName?: StringFieldUpdateOperationsInput | string
  }

  export type time_entriesCreateInput = {
    date: Date | string
    project: string
    client?: string | null
    description?: string | null
    task?: string | null
    group?: string | null
    email?: string | null
    startDate: Date | string
    startTime: Date | string
    endDate: Date | string
    endTime: Date | string
    hoursWorked: Date | string
    durationDecimal?: Decimal | DecimalJsLike | number | string | null
    uniqueEntryId: string
    employee: employeesCreateNestedOneWithoutTime_entriesInput
    import_log: import_logsCreateNestedOneWithoutTime_entriesInput
  }

  export type time_entriesUncheckedCreateInput = {
    id?: number
    employeeId: number
    date: Date | string
    project: string
    client?: string | null
    description?: string | null
    task?: string | null
    group?: string | null
    email?: string | null
    startDate: Date | string
    startTime: Date | string
    endDate: Date | string
    endTime: Date | string
    hoursWorked: Date | string
    durationDecimal?: Decimal | DecimalJsLike | number | string | null
    uniqueEntryId: string
    importBatchId: number
  }

  export type time_entriesUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    task?: NullableStringFieldUpdateOperationsInput | string | null
    group?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DateTimeFieldUpdateOperationsInput | Date | string
    durationDecimal?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    uniqueEntryId?: StringFieldUpdateOperationsInput | string
    employee?: employeesUpdateOneRequiredWithoutTime_entriesNestedInput
    import_log?: import_logsUpdateOneRequiredWithoutTime_entriesNestedInput
  }

  export type time_entriesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    task?: NullableStringFieldUpdateOperationsInput | string | null
    group?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DateTimeFieldUpdateOperationsInput | Date | string
    durationDecimal?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    uniqueEntryId?: StringFieldUpdateOperationsInput | string
    importBatchId?: IntFieldUpdateOperationsInput | number
  }

  export type time_entriesCreateManyInput = {
    id?: number
    employeeId: number
    date: Date | string
    project: string
    client?: string | null
    description?: string | null
    task?: string | null
    group?: string | null
    email?: string | null
    startDate: Date | string
    startTime: Date | string
    endDate: Date | string
    endTime: Date | string
    hoursWorked: Date | string
    durationDecimal?: Decimal | DecimalJsLike | number | string | null
    uniqueEntryId: string
    importBatchId: number
  }

  export type time_entriesUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    task?: NullableStringFieldUpdateOperationsInput | string | null
    group?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DateTimeFieldUpdateOperationsInput | Date | string
    durationDecimal?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    uniqueEntryId?: StringFieldUpdateOperationsInput | string
  }

  export type time_entriesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    task?: NullableStringFieldUpdateOperationsInput | string | null
    group?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DateTimeFieldUpdateOperationsInput | Date | string
    durationDecimal?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    uniqueEntryId?: StringFieldUpdateOperationsInput | string
    importBatchId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumEmploymentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EmploymentType | EnumEmploymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EmploymentType[] | ListEnumEmploymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmploymentType[] | ListEnumEmploymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEmploymentTypeFilter<$PrismaModel> | $Enums.EmploymentType
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type Time_entriesListRelationFilter = {
    every?: time_entriesWhereInput
    some?: time_entriesWhereInput
    none?: time_entriesWhereInput
  }

  export type time_entriesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type employeesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    position?: SortOrder
    department?: SortOrder
    employmentType?: SortOrder
    weeklyCommittedHours?: SortOrder
    startDate?: SortOrder
    joinDate?: SortOrder
    isActive?: SortOrder
    clockifyName?: SortOrder
    bio?: SortOrder
    avatarUrl?: SortOrder
  }

  export type employeesAvgOrderByAggregateInput = {
    id?: SortOrder
    weeklyCommittedHours?: SortOrder
  }

  export type employeesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    position?: SortOrder
    department?: SortOrder
    employmentType?: SortOrder
    weeklyCommittedHours?: SortOrder
    startDate?: SortOrder
    joinDate?: SortOrder
    isActive?: SortOrder
    clockifyName?: SortOrder
    bio?: SortOrder
    avatarUrl?: SortOrder
  }

  export type employeesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    position?: SortOrder
    department?: SortOrder
    employmentType?: SortOrder
    weeklyCommittedHours?: SortOrder
    startDate?: SortOrder
    joinDate?: SortOrder
    isActive?: SortOrder
    clockifyName?: SortOrder
    bio?: SortOrder
    avatarUrl?: SortOrder
  }

  export type employeesSumOrderByAggregateInput = {
    id?: SortOrder
    weeklyCommittedHours?: SortOrder
  }

  export type EnumEmploymentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmploymentType | EnumEmploymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EmploymentType[] | ListEnumEmploymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmploymentType[] | ListEnumEmploymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEmploymentTypeWithAggregatesFilter<$PrismaModel> | $Enums.EmploymentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmploymentTypeFilter<$PrismaModel>
    _max?: NestedEnumEmploymentTypeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumImportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ImportStatus | EnumImportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ImportStatus[] | ListEnumImportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ImportStatus[] | ListEnumImportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumImportStatusFilter<$PrismaModel> | $Enums.ImportStatus
  }

  export type import_logsCountOrderByAggregateInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    importDate?: SortOrder
    status?: SortOrder
    fileName?: SortOrder
  }

  export type import_logsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type import_logsMaxOrderByAggregateInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    importDate?: SortOrder
    status?: SortOrder
    fileName?: SortOrder
  }

  export type import_logsMinOrderByAggregateInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    importDate?: SortOrder
    status?: SortOrder
    fileName?: SortOrder
  }

  export type import_logsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumImportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ImportStatus | EnumImportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ImportStatus[] | ListEnumImportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ImportStatus[] | ListEnumImportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumImportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ImportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumImportStatusFilter<$PrismaModel>
    _max?: NestedEnumImportStatusFilter<$PrismaModel>
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type EmployeesScalarRelationFilter = {
    is?: employeesWhereInput
    isNot?: employeesWhereInput
  }

  export type Import_logsScalarRelationFilter = {
    is?: import_logsWhereInput
    isNot?: import_logsWhereInput
  }

  export type time_entriesCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    project?: SortOrder
    client?: SortOrder
    description?: SortOrder
    task?: SortOrder
    group?: SortOrder
    email?: SortOrder
    startDate?: SortOrder
    startTime?: SortOrder
    endDate?: SortOrder
    endTime?: SortOrder
    hoursWorked?: SortOrder
    durationDecimal?: SortOrder
    uniqueEntryId?: SortOrder
    importBatchId?: SortOrder
  }

  export type time_entriesAvgOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    durationDecimal?: SortOrder
    importBatchId?: SortOrder
  }

  export type time_entriesMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    project?: SortOrder
    client?: SortOrder
    description?: SortOrder
    task?: SortOrder
    group?: SortOrder
    email?: SortOrder
    startDate?: SortOrder
    startTime?: SortOrder
    endDate?: SortOrder
    endTime?: SortOrder
    hoursWorked?: SortOrder
    durationDecimal?: SortOrder
    uniqueEntryId?: SortOrder
    importBatchId?: SortOrder
  }

  export type time_entriesMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    project?: SortOrder
    client?: SortOrder
    description?: SortOrder
    task?: SortOrder
    group?: SortOrder
    email?: SortOrder
    startDate?: SortOrder
    startTime?: SortOrder
    endDate?: SortOrder
    endTime?: SortOrder
    hoursWorked?: SortOrder
    durationDecimal?: SortOrder
    uniqueEntryId?: SortOrder
    importBatchId?: SortOrder
  }

  export type time_entriesSumOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    durationDecimal?: SortOrder
    importBatchId?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type time_entriesCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<time_entriesCreateWithoutEmployeeInput, time_entriesUncheckedCreateWithoutEmployeeInput> | time_entriesCreateWithoutEmployeeInput[] | time_entriesUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: time_entriesCreateOrConnectWithoutEmployeeInput | time_entriesCreateOrConnectWithoutEmployeeInput[]
    createMany?: time_entriesCreateManyEmployeeInputEnvelope
    connect?: time_entriesWhereUniqueInput | time_entriesWhereUniqueInput[]
  }

  export type time_entriesUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<time_entriesCreateWithoutEmployeeInput, time_entriesUncheckedCreateWithoutEmployeeInput> | time_entriesCreateWithoutEmployeeInput[] | time_entriesUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: time_entriesCreateOrConnectWithoutEmployeeInput | time_entriesCreateOrConnectWithoutEmployeeInput[]
    createMany?: time_entriesCreateManyEmployeeInputEnvelope
    connect?: time_entriesWhereUniqueInput | time_entriesWhereUniqueInput[]
  }

  export type EnumEmploymentTypeFieldUpdateOperationsInput = {
    set?: $Enums.EmploymentType
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type time_entriesUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<time_entriesCreateWithoutEmployeeInput, time_entriesUncheckedCreateWithoutEmployeeInput> | time_entriesCreateWithoutEmployeeInput[] | time_entriesUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: time_entriesCreateOrConnectWithoutEmployeeInput | time_entriesCreateOrConnectWithoutEmployeeInput[]
    upsert?: time_entriesUpsertWithWhereUniqueWithoutEmployeeInput | time_entriesUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: time_entriesCreateManyEmployeeInputEnvelope
    set?: time_entriesWhereUniqueInput | time_entriesWhereUniqueInput[]
    disconnect?: time_entriesWhereUniqueInput | time_entriesWhereUniqueInput[]
    delete?: time_entriesWhereUniqueInput | time_entriesWhereUniqueInput[]
    connect?: time_entriesWhereUniqueInput | time_entriesWhereUniqueInput[]
    update?: time_entriesUpdateWithWhereUniqueWithoutEmployeeInput | time_entriesUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: time_entriesUpdateManyWithWhereWithoutEmployeeInput | time_entriesUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: time_entriesScalarWhereInput | time_entriesScalarWhereInput[]
  }

  export type time_entriesUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<time_entriesCreateWithoutEmployeeInput, time_entriesUncheckedCreateWithoutEmployeeInput> | time_entriesCreateWithoutEmployeeInput[] | time_entriesUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: time_entriesCreateOrConnectWithoutEmployeeInput | time_entriesCreateOrConnectWithoutEmployeeInput[]
    upsert?: time_entriesUpsertWithWhereUniqueWithoutEmployeeInput | time_entriesUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: time_entriesCreateManyEmployeeInputEnvelope
    set?: time_entriesWhereUniqueInput | time_entriesWhereUniqueInput[]
    disconnect?: time_entriesWhereUniqueInput | time_entriesWhereUniqueInput[]
    delete?: time_entriesWhereUniqueInput | time_entriesWhereUniqueInput[]
    connect?: time_entriesWhereUniqueInput | time_entriesWhereUniqueInput[]
    update?: time_entriesUpdateWithWhereUniqueWithoutEmployeeInput | time_entriesUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: time_entriesUpdateManyWithWhereWithoutEmployeeInput | time_entriesUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: time_entriesScalarWhereInput | time_entriesScalarWhereInput[]
  }

  export type time_entriesCreateNestedManyWithoutImport_logInput = {
    create?: XOR<time_entriesCreateWithoutImport_logInput, time_entriesUncheckedCreateWithoutImport_logInput> | time_entriesCreateWithoutImport_logInput[] | time_entriesUncheckedCreateWithoutImport_logInput[]
    connectOrCreate?: time_entriesCreateOrConnectWithoutImport_logInput | time_entriesCreateOrConnectWithoutImport_logInput[]
    createMany?: time_entriesCreateManyImport_logInputEnvelope
    connect?: time_entriesWhereUniqueInput | time_entriesWhereUniqueInput[]
  }

  export type time_entriesUncheckedCreateNestedManyWithoutImport_logInput = {
    create?: XOR<time_entriesCreateWithoutImport_logInput, time_entriesUncheckedCreateWithoutImport_logInput> | time_entriesCreateWithoutImport_logInput[] | time_entriesUncheckedCreateWithoutImport_logInput[]
    connectOrCreate?: time_entriesCreateOrConnectWithoutImport_logInput | time_entriesCreateOrConnectWithoutImport_logInput[]
    createMany?: time_entriesCreateManyImport_logInputEnvelope
    connect?: time_entriesWhereUniqueInput | time_entriesWhereUniqueInput[]
  }

  export type EnumImportStatusFieldUpdateOperationsInput = {
    set?: $Enums.ImportStatus
  }

  export type time_entriesUpdateManyWithoutImport_logNestedInput = {
    create?: XOR<time_entriesCreateWithoutImport_logInput, time_entriesUncheckedCreateWithoutImport_logInput> | time_entriesCreateWithoutImport_logInput[] | time_entriesUncheckedCreateWithoutImport_logInput[]
    connectOrCreate?: time_entriesCreateOrConnectWithoutImport_logInput | time_entriesCreateOrConnectWithoutImport_logInput[]
    upsert?: time_entriesUpsertWithWhereUniqueWithoutImport_logInput | time_entriesUpsertWithWhereUniqueWithoutImport_logInput[]
    createMany?: time_entriesCreateManyImport_logInputEnvelope
    set?: time_entriesWhereUniqueInput | time_entriesWhereUniqueInput[]
    disconnect?: time_entriesWhereUniqueInput | time_entriesWhereUniqueInput[]
    delete?: time_entriesWhereUniqueInput | time_entriesWhereUniqueInput[]
    connect?: time_entriesWhereUniqueInput | time_entriesWhereUniqueInput[]
    update?: time_entriesUpdateWithWhereUniqueWithoutImport_logInput | time_entriesUpdateWithWhereUniqueWithoutImport_logInput[]
    updateMany?: time_entriesUpdateManyWithWhereWithoutImport_logInput | time_entriesUpdateManyWithWhereWithoutImport_logInput[]
    deleteMany?: time_entriesScalarWhereInput | time_entriesScalarWhereInput[]
  }

  export type time_entriesUncheckedUpdateManyWithoutImport_logNestedInput = {
    create?: XOR<time_entriesCreateWithoutImport_logInput, time_entriesUncheckedCreateWithoutImport_logInput> | time_entriesCreateWithoutImport_logInput[] | time_entriesUncheckedCreateWithoutImport_logInput[]
    connectOrCreate?: time_entriesCreateOrConnectWithoutImport_logInput | time_entriesCreateOrConnectWithoutImport_logInput[]
    upsert?: time_entriesUpsertWithWhereUniqueWithoutImport_logInput | time_entriesUpsertWithWhereUniqueWithoutImport_logInput[]
    createMany?: time_entriesCreateManyImport_logInputEnvelope
    set?: time_entriesWhereUniqueInput | time_entriesWhereUniqueInput[]
    disconnect?: time_entriesWhereUniqueInput | time_entriesWhereUniqueInput[]
    delete?: time_entriesWhereUniqueInput | time_entriesWhereUniqueInput[]
    connect?: time_entriesWhereUniqueInput | time_entriesWhereUniqueInput[]
    update?: time_entriesUpdateWithWhereUniqueWithoutImport_logInput | time_entriesUpdateWithWhereUniqueWithoutImport_logInput[]
    updateMany?: time_entriesUpdateManyWithWhereWithoutImport_logInput | time_entriesUpdateManyWithWhereWithoutImport_logInput[]
    deleteMany?: time_entriesScalarWhereInput | time_entriesScalarWhereInput[]
  }

  export type employeesCreateNestedOneWithoutTime_entriesInput = {
    create?: XOR<employeesCreateWithoutTime_entriesInput, employeesUncheckedCreateWithoutTime_entriesInput>
    connectOrCreate?: employeesCreateOrConnectWithoutTime_entriesInput
    connect?: employeesWhereUniqueInput
  }

  export type import_logsCreateNestedOneWithoutTime_entriesInput = {
    create?: XOR<import_logsCreateWithoutTime_entriesInput, import_logsUncheckedCreateWithoutTime_entriesInput>
    connectOrCreate?: import_logsCreateOrConnectWithoutTime_entriesInput
    connect?: import_logsWhereUniqueInput
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type employeesUpdateOneRequiredWithoutTime_entriesNestedInput = {
    create?: XOR<employeesCreateWithoutTime_entriesInput, employeesUncheckedCreateWithoutTime_entriesInput>
    connectOrCreate?: employeesCreateOrConnectWithoutTime_entriesInput
    upsert?: employeesUpsertWithoutTime_entriesInput
    connect?: employeesWhereUniqueInput
    update?: XOR<XOR<employeesUpdateToOneWithWhereWithoutTime_entriesInput, employeesUpdateWithoutTime_entriesInput>, employeesUncheckedUpdateWithoutTime_entriesInput>
  }

  export type import_logsUpdateOneRequiredWithoutTime_entriesNestedInput = {
    create?: XOR<import_logsCreateWithoutTime_entriesInput, import_logsUncheckedCreateWithoutTime_entriesInput>
    connectOrCreate?: import_logsCreateOrConnectWithoutTime_entriesInput
    upsert?: import_logsUpsertWithoutTime_entriesInput
    connect?: import_logsWhereUniqueInput
    update?: XOR<XOR<import_logsUpdateToOneWithWhereWithoutTime_entriesInput, import_logsUpdateWithoutTime_entriesInput>, import_logsUncheckedUpdateWithoutTime_entriesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumEmploymentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EmploymentType | EnumEmploymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EmploymentType[] | ListEnumEmploymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmploymentType[] | ListEnumEmploymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEmploymentTypeFilter<$PrismaModel> | $Enums.EmploymentType
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumEmploymentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmploymentType | EnumEmploymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EmploymentType[] | ListEnumEmploymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmploymentType[] | ListEnumEmploymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEmploymentTypeWithAggregatesFilter<$PrismaModel> | $Enums.EmploymentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmploymentTypeFilter<$PrismaModel>
    _max?: NestedEnumEmploymentTypeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumImportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ImportStatus | EnumImportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ImportStatus[] | ListEnumImportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ImportStatus[] | ListEnumImportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumImportStatusFilter<$PrismaModel> | $Enums.ImportStatus
  }

  export type NestedEnumImportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ImportStatus | EnumImportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ImportStatus[] | ListEnumImportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ImportStatus[] | ListEnumImportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumImportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ImportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumImportStatusFilter<$PrismaModel>
    _max?: NestedEnumImportStatusFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type time_entriesCreateWithoutEmployeeInput = {
    date: Date | string
    project: string
    client?: string | null
    description?: string | null
    task?: string | null
    group?: string | null
    email?: string | null
    startDate: Date | string
    startTime: Date | string
    endDate: Date | string
    endTime: Date | string
    hoursWorked: Date | string
    durationDecimal?: Decimal | DecimalJsLike | number | string | null
    uniqueEntryId: string
    import_log: import_logsCreateNestedOneWithoutTime_entriesInput
  }

  export type time_entriesUncheckedCreateWithoutEmployeeInput = {
    id?: number
    date: Date | string
    project: string
    client?: string | null
    description?: string | null
    task?: string | null
    group?: string | null
    email?: string | null
    startDate: Date | string
    startTime: Date | string
    endDate: Date | string
    endTime: Date | string
    hoursWorked: Date | string
    durationDecimal?: Decimal | DecimalJsLike | number | string | null
    uniqueEntryId: string
    importBatchId: number
  }

  export type time_entriesCreateOrConnectWithoutEmployeeInput = {
    where: time_entriesWhereUniqueInput
    create: XOR<time_entriesCreateWithoutEmployeeInput, time_entriesUncheckedCreateWithoutEmployeeInput>
  }

  export type time_entriesCreateManyEmployeeInputEnvelope = {
    data: time_entriesCreateManyEmployeeInput | time_entriesCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type time_entriesUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: time_entriesWhereUniqueInput
    update: XOR<time_entriesUpdateWithoutEmployeeInput, time_entriesUncheckedUpdateWithoutEmployeeInput>
    create: XOR<time_entriesCreateWithoutEmployeeInput, time_entriesUncheckedCreateWithoutEmployeeInput>
  }

  export type time_entriesUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: time_entriesWhereUniqueInput
    data: XOR<time_entriesUpdateWithoutEmployeeInput, time_entriesUncheckedUpdateWithoutEmployeeInput>
  }

  export type time_entriesUpdateManyWithWhereWithoutEmployeeInput = {
    where: time_entriesScalarWhereInput
    data: XOR<time_entriesUpdateManyMutationInput, time_entriesUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type time_entriesScalarWhereInput = {
    AND?: time_entriesScalarWhereInput | time_entriesScalarWhereInput[]
    OR?: time_entriesScalarWhereInput[]
    NOT?: time_entriesScalarWhereInput | time_entriesScalarWhereInput[]
    id?: IntFilter<"time_entries"> | number
    employeeId?: IntFilter<"time_entries"> | number
    date?: DateTimeFilter<"time_entries"> | Date | string
    project?: StringFilter<"time_entries"> | string
    client?: StringNullableFilter<"time_entries"> | string | null
    description?: StringNullableFilter<"time_entries"> | string | null
    task?: StringNullableFilter<"time_entries"> | string | null
    group?: StringNullableFilter<"time_entries"> | string | null
    email?: StringNullableFilter<"time_entries"> | string | null
    startDate?: DateTimeFilter<"time_entries"> | Date | string
    startTime?: DateTimeFilter<"time_entries"> | Date | string
    endDate?: DateTimeFilter<"time_entries"> | Date | string
    endTime?: DateTimeFilter<"time_entries"> | Date | string
    hoursWorked?: DateTimeFilter<"time_entries"> | Date | string
    durationDecimal?: DecimalNullableFilter<"time_entries"> | Decimal | DecimalJsLike | number | string | null
    uniqueEntryId?: StringFilter<"time_entries"> | string
    importBatchId?: IntFilter<"time_entries"> | number
  }

  export type time_entriesCreateWithoutImport_logInput = {
    date: Date | string
    project: string
    client?: string | null
    description?: string | null
    task?: string | null
    group?: string | null
    email?: string | null
    startDate: Date | string
    startTime: Date | string
    endDate: Date | string
    endTime: Date | string
    hoursWorked: Date | string
    durationDecimal?: Decimal | DecimalJsLike | number | string | null
    uniqueEntryId: string
    employee: employeesCreateNestedOneWithoutTime_entriesInput
  }

  export type time_entriesUncheckedCreateWithoutImport_logInput = {
    id?: number
    employeeId: number
    date: Date | string
    project: string
    client?: string | null
    description?: string | null
    task?: string | null
    group?: string | null
    email?: string | null
    startDate: Date | string
    startTime: Date | string
    endDate: Date | string
    endTime: Date | string
    hoursWorked: Date | string
    durationDecimal?: Decimal | DecimalJsLike | number | string | null
    uniqueEntryId: string
  }

  export type time_entriesCreateOrConnectWithoutImport_logInput = {
    where: time_entriesWhereUniqueInput
    create: XOR<time_entriesCreateWithoutImport_logInput, time_entriesUncheckedCreateWithoutImport_logInput>
  }

  export type time_entriesCreateManyImport_logInputEnvelope = {
    data: time_entriesCreateManyImport_logInput | time_entriesCreateManyImport_logInput[]
    skipDuplicates?: boolean
  }

  export type time_entriesUpsertWithWhereUniqueWithoutImport_logInput = {
    where: time_entriesWhereUniqueInput
    update: XOR<time_entriesUpdateWithoutImport_logInput, time_entriesUncheckedUpdateWithoutImport_logInput>
    create: XOR<time_entriesCreateWithoutImport_logInput, time_entriesUncheckedCreateWithoutImport_logInput>
  }

  export type time_entriesUpdateWithWhereUniqueWithoutImport_logInput = {
    where: time_entriesWhereUniqueInput
    data: XOR<time_entriesUpdateWithoutImport_logInput, time_entriesUncheckedUpdateWithoutImport_logInput>
  }

  export type time_entriesUpdateManyWithWhereWithoutImport_logInput = {
    where: time_entriesScalarWhereInput
    data: XOR<time_entriesUpdateManyMutationInput, time_entriesUncheckedUpdateManyWithoutImport_logInput>
  }

  export type employeesCreateWithoutTime_entriesInput = {
    name: string
    email: string
    phone?: string | null
    position?: string | null
    department: string
    employmentType: $Enums.EmploymentType
    weeklyCommittedHours: number
    startDate: Date | string
    joinDate?: Date | string | null
    isActive?: boolean
    clockifyName?: string | null
    bio?: string | null
    avatarUrl?: string | null
  }

  export type employeesUncheckedCreateWithoutTime_entriesInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    position?: string | null
    department: string
    employmentType: $Enums.EmploymentType
    weeklyCommittedHours: number
    startDate: Date | string
    joinDate?: Date | string | null
    isActive?: boolean
    clockifyName?: string | null
    bio?: string | null
    avatarUrl?: string | null
  }

  export type employeesCreateOrConnectWithoutTime_entriesInput = {
    where: employeesWhereUniqueInput
    create: XOR<employeesCreateWithoutTime_entriesInput, employeesUncheckedCreateWithoutTime_entriesInput>
  }

  export type import_logsCreateWithoutTime_entriesInput = {
    startDate: Date | string
    endDate: Date | string
    importDate?: Date | string
    status: $Enums.ImportStatus
    fileName: string
  }

  export type import_logsUncheckedCreateWithoutTime_entriesInput = {
    id?: number
    startDate: Date | string
    endDate: Date | string
    importDate?: Date | string
    status: $Enums.ImportStatus
    fileName: string
  }

  export type import_logsCreateOrConnectWithoutTime_entriesInput = {
    where: import_logsWhereUniqueInput
    create: XOR<import_logsCreateWithoutTime_entriesInput, import_logsUncheckedCreateWithoutTime_entriesInput>
  }

  export type employeesUpsertWithoutTime_entriesInput = {
    update: XOR<employeesUpdateWithoutTime_entriesInput, employeesUncheckedUpdateWithoutTime_entriesInput>
    create: XOR<employeesCreateWithoutTime_entriesInput, employeesUncheckedCreateWithoutTime_entriesInput>
    where?: employeesWhereInput
  }

  export type employeesUpdateToOneWithWhereWithoutTime_entriesInput = {
    where?: employeesWhereInput
    data: XOR<employeesUpdateWithoutTime_entriesInput, employeesUncheckedUpdateWithoutTime_entriesInput>
  }

  export type employeesUpdateWithoutTime_entriesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    employmentType?: EnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType
    weeklyCommittedHours?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    joinDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    clockifyName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type employeesUncheckedUpdateWithoutTime_entriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    employmentType?: EnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType
    weeklyCommittedHours?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    joinDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    clockifyName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type import_logsUpsertWithoutTime_entriesInput = {
    update: XOR<import_logsUpdateWithoutTime_entriesInput, import_logsUncheckedUpdateWithoutTime_entriesInput>
    create: XOR<import_logsCreateWithoutTime_entriesInput, import_logsUncheckedCreateWithoutTime_entriesInput>
    where?: import_logsWhereInput
  }

  export type import_logsUpdateToOneWithWhereWithoutTime_entriesInput = {
    where?: import_logsWhereInput
    data: XOR<import_logsUpdateWithoutTime_entriesInput, import_logsUncheckedUpdateWithoutTime_entriesInput>
  }

  export type import_logsUpdateWithoutTime_entriesInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    importDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumImportStatusFieldUpdateOperationsInput | $Enums.ImportStatus
    fileName?: StringFieldUpdateOperationsInput | string
  }

  export type import_logsUncheckedUpdateWithoutTime_entriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    importDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumImportStatusFieldUpdateOperationsInput | $Enums.ImportStatus
    fileName?: StringFieldUpdateOperationsInput | string
  }

  export type time_entriesCreateManyEmployeeInput = {
    id?: number
    date: Date | string
    project: string
    client?: string | null
    description?: string | null
    task?: string | null
    group?: string | null
    email?: string | null
    startDate: Date | string
    startTime: Date | string
    endDate: Date | string
    endTime: Date | string
    hoursWorked: Date | string
    durationDecimal?: Decimal | DecimalJsLike | number | string | null
    uniqueEntryId: string
    importBatchId: number
  }

  export type time_entriesUpdateWithoutEmployeeInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    task?: NullableStringFieldUpdateOperationsInput | string | null
    group?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DateTimeFieldUpdateOperationsInput | Date | string
    durationDecimal?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    uniqueEntryId?: StringFieldUpdateOperationsInput | string
    import_log?: import_logsUpdateOneRequiredWithoutTime_entriesNestedInput
  }

  export type time_entriesUncheckedUpdateWithoutEmployeeInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    task?: NullableStringFieldUpdateOperationsInput | string | null
    group?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DateTimeFieldUpdateOperationsInput | Date | string
    durationDecimal?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    uniqueEntryId?: StringFieldUpdateOperationsInput | string
    importBatchId?: IntFieldUpdateOperationsInput | number
  }

  export type time_entriesUncheckedUpdateManyWithoutEmployeeInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    task?: NullableStringFieldUpdateOperationsInput | string | null
    group?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DateTimeFieldUpdateOperationsInput | Date | string
    durationDecimal?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    uniqueEntryId?: StringFieldUpdateOperationsInput | string
    importBatchId?: IntFieldUpdateOperationsInput | number
  }

  export type time_entriesCreateManyImport_logInput = {
    id?: number
    employeeId: number
    date: Date | string
    project: string
    client?: string | null
    description?: string | null
    task?: string | null
    group?: string | null
    email?: string | null
    startDate: Date | string
    startTime: Date | string
    endDate: Date | string
    endTime: Date | string
    hoursWorked: Date | string
    durationDecimal?: Decimal | DecimalJsLike | number | string | null
    uniqueEntryId: string
  }

  export type time_entriesUpdateWithoutImport_logInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    task?: NullableStringFieldUpdateOperationsInput | string | null
    group?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DateTimeFieldUpdateOperationsInput | Date | string
    durationDecimal?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    uniqueEntryId?: StringFieldUpdateOperationsInput | string
    employee?: employeesUpdateOneRequiredWithoutTime_entriesNestedInput
  }

  export type time_entriesUncheckedUpdateWithoutImport_logInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    task?: NullableStringFieldUpdateOperationsInput | string | null
    group?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DateTimeFieldUpdateOperationsInput | Date | string
    durationDecimal?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    uniqueEntryId?: StringFieldUpdateOperationsInput | string
  }

  export type time_entriesUncheckedUpdateManyWithoutImport_logInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    task?: NullableStringFieldUpdateOperationsInput | string | null
    group?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DateTimeFieldUpdateOperationsInput | Date | string
    durationDecimal?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    uniqueEntryId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
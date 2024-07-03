# Typescrip basisc

## Basics
```ts
let number: number
const name: string
let listNames: Array<String> 
const age = 24 /* type implicity precised */

/* return type in function */
type User = {
  readonly id: string,
  name: string
  age?: number
}

let findUserById = (id:string):User {}

/* Combine types */
type UserStatue = {
  isConnect: flase
}

type UserData = User & UserStatue & {
  isNab: false
}

/* Array */
const superHeros: string[] = []
const superHeros: Array<string> = []
const superHeros: string[][] = []
const superHeroAndAges: (string, number)[] = ["batman", 24, "superman", 2]

/* variable that can take specifics values */
const bestSuperHero = "batman" | "batman2"

/* Union */
let score: number | string = 33

/* Tuple: to specific order or value type in a array (avoid using tuple cause it can have unexpected behavior with push, pop, shift ...) */
let tUser: [string, number, boolean] = [true, 123, "hi"]

/* Enum: used for list of specific values */
enum SeatChoice {
  AISLE,
  MIDDLE,
  WINDOW
}

const mySeat = SeatChoice.AISLE

/* Class: constructor, function, getter, setter */
class Tender {
  title: string
  description: string
  constructor(private _uuid: number, private title: string, private description: string) {
    this.title = title
    this.description = description
  }

// can I reduce this function 
  get uuid():string {
  return this._uuid
  }

  get title():string {
    return this.title
  }

  set title(title: string) {
    if (title.length < 3) {
      throw new Error("title must be at least 3 characters")
    }
    this.title = title
  }
  
}

/* Interfaces: data, function */

interface Project {
  title: string
  description: string,

  getData(): Tender {
    return new Tender("uuid", "title", "description")
  }
}

class TenderProject implements Project {
  title: string
  description: string
  constructor(title: string, description: string) {
    this.title = title
    this.description = description
  }
}

const tenderProject = new TenderProject()
tenderProject.getData() /* return a Tender */

/* Abstract Class: can't be instanciate, can be used as a base class, canShowModal */


/* Generics */

/* Type checking */

type Fhish = {
  swim: () => void
}
type Bird = {
  fly: () => void
}

function move(animal: Fish | Bird) {
  if ("swim" in animal) { /* with this condition ts know that animal is a fish (as it has the key swim) */
    animal.swim()
  } else {
    animal.fly()
  }
}

/* Type Guard */
function isFish(pet: Fish | Bird): pet is Fish 
/* return true if pet is a fish so ts will know that if it's return true, pet is a fish*/
{
  return (pet as Fish).swim !== undefined
}
 

/* Exhaustiveness checking */
/* To make sure that typescrip will notice if a type checking is missing when using switchs */

type Shape = Circle | Square

function getArea(shape:  Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2
    case "square":
      return shape.sideLength ** 2
    default: 
      const _exhautiveCheck: never = shape /* ts will show a error here if any type is added to shape (ex: Circle | Square | Rectangle will make ts show error here so we can update this method anytime somene update shape type) */
      return _exhautiveCheck
  }
}
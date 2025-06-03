import { PrivateComponent } from "./private-component"
import { PublicPart } from "./public-part"

export const PublicGraph = () => {
  return (<>
    <PrivateComponent/>
    <PublicPart/>
  </>)
}
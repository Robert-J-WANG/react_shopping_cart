## shopping cart

### react+ vit+ typescript+ bootstrap

### Before coding ...

1. #### Create  the app

    ```bash
    yarn create vite
    ```

    ```bash
     ✔ Project name: … myPortfolio​ ✔ Package name: … Project Name​ ✔ Select a framework: › React​ ✔ Select a variant: › TypeScript
    ```

    ```bash
    cd Project Name file
    ```

    ##### Create vite config

    ```
    yarn 
    ```

    ##### Test the project

    ```bash
     yarn dev
    ```

2. #### install the libraries

    ```bash
    yarn add react-router-dom bootstrap react-bootstrap
    ```

    

3. #### open the project in VScode, create folders

    ##### Components/ pages/data/context/hooks/ untils/



### Coding now ...

1. #### Delete all unnecessay files created defalt files by vite

2. #### import bootstrap in to the main.tsx

    ```tsx
    import "bootstrap/dist/css/bootstrap.min.css";
    ```

3. #### import bootstrap in to the main.tsx, and use BrowserRouter

    ```tsx
    import { BrowserRouter } from "react-router-dom";
    ```

    ```tsx
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
    ```

4. #### pages文件夹下创建3个页面组件，Home, About , Store, 使用快捷键 rfc

5. #### 入口文件App.tsx中，引入路由组件，和bootstrap的UI组件

    ##### 使用bootstrap的container组件，并注册3个页面的路由

    ```tsx
    import { Route, Routes } from "react-router-dom";
    import { Container } from "react-bootstrap";
    import { Home } from "./pages/Home";
    import { About } from "./pages/About";
    import { Store } from "./pages/Store";
    
    function App() {
      return (
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/store" element={<Store />} />
          </Routes>
        </Container>
      );
    }
    
    export default App;
    ```

6. #### 创建导航栏组件，用于路由跳转

    1. ##### components文件夹在创建Navbar组件，并引用bootstrap的Navbar的ui组件，并重命名。添加样式

        ```tsx
        import { Container, Navbar as NavbarBs } from "react-bootstrap";
        
        export default function Narbar() {
          return (
            <NavbarBs className="bg-white shadow-sm mb-4">
              <Container>navbar</Container>
            </NavbarBs>
          );
        }
        ```

     2. ##### 在App组件中引入使用

        ```tsx
        import { Route, Routes } from "react-router-dom";
        import { Container } from "react-bootstrap";
        import { Home } from "./pages/Home";
        import { About } from "./pages/About";
        import { Store } from "./pages/Store";
        import Navbar from "./components/Navbar";
        
        function App() {
          return (
            <>
              <Navbar></Navbar>
              <Container className="mb-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/store" element={<Store />} />
                </Routes>
              </Container>
            </>
          );
        }
        
        export default App;
        
        ```

    3. ##### 添加路由连接， 使用bootstrap的nav组件，作为router的navlink组件 

        ```tsx
        import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
        import { NavLink } from "react-router-dom";
        
        export default function Narbar() {
          return (
            <NavbarBs className="bg-white shadow-sm mb-4">
              <Container>
                <Nav>
                  <Nav.Link to="/" as={NavLink}>
                    Home
                  </Nav.Link>
                  <Nav.Link to="/about" as={NavLink}>
                    About
                  </Nav.Link>
                  <Nav.Link to="/store" as={NavLink}>
                    Store
                  </Nav.Link>
                </Nav>
              </Container>
            </NavbarBs>
          );
        }
        ```

    4. ##### 导航栏组件中引入button组件，使用购物车sv'g图标，添加购物车里数量的盒子。设置相应的c's's样式

        ```tsx
        import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
        import { NavLink } from "react-router-dom";
        
        export default function Narbar() {
          return (
            <NavbarBs className="bg-white shadow-sm mb-4">
              <Container>
                {/* 导航链接部分 */}
                <Nav className="me-auto">
                ...
                </Nav>
                {/* 购物车部分 */}
                <Button
                  style={{ width: "3em", height: "3em", position: "relative" }}
                  variant="outline-primary"
                  className="rounded-circle"
                >
                  <svg >
                    <path... />
                  </svg>
                  {/* 购物车数量 */}
                  <div
                    className="bg-danger rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                      color: "white",
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      transform: "translate(25%,25%)",
                    }}>3</div>
                </Button>
              </Container>
            </NavbarBs>
          );
        }
        
        ```

7. #### Store 组件部分

    1. ##### 准备数据：data文件夹中创建item.json

    2. ##### store组件中引入数据， 使用bootstrap的ROW和COL组件控制样式，渲染数据到页面，封装为一个组将StoreItem,将数据传递给StoreItem

        ```tsx
        import StoreItem from "../components/StoreItem";
        import storeItems from "../data/items.json";
        import { Row, Col } from "react-bootstrap";
        
        export function Store() {
          return (
            <>
              <h1>Store</h1>
              <Row md={2} xs={1} lg={3} className="g-3">
                {storeItems.map((item) => (
                  // console.log(item);
                  <Col key={item.id}>
                    <StoreItem {...item} />
                  </Col>
                ))}
              </Row>
            </>
          );
        }
        ```

        

    3. ##### StoreItem设置参数的type类型

        ```tsx
        type storeItemsProps = {
          id: number;
          name: string;
          price: number;
          imgUrl: string;
        };
        
        export default function StoreItem({ id, name, price,imgUrl,}: storeItemsProps) {
        return (...)
        }
        ```

        

    4. ##### 使用bootstrap的card组件进行数据的初步渲染，设置样式

        ```tsx
        import { Card } from "react-bootstrap";
        
        type storeItemsProps = {
          id: number;
          name: string;
          price: number;
          imgUrl: string;
        };
        
        export default function StoreItem({id,name,price,imgUrl,}: storeItemsProps) {
          return (
            <Card>
                  {/* 图片 */}
              <Card.Img
                variant="top"
                src={imgUrl}
                height="300px"
                style={{
                  objectFit: "contain",
                }}
              />
                   {/* 文字内容 */}
              <Card.Body className="d-flex flex-column ">
                  {/* 名字和价格 */}
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                  <span className="fs-2">{name}</span>
                  <span className="ms-3 text-muted">${price}</span>
                </Card.Title>
                   {/* 增删选项 */}
              </Card.Body>
            </Card>
          );
        }
        ```
    
    5. ##### 创建格式化价格的工具类函数，设置价格的显示格式：utitls文件夹下创建formatCurrency函数
    
        ```tsx
        // 实例化一个Intl对象，调用去数字格式话的端口，设置格式化的配置
        const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
          currency: "NZD",
          style: "currency",
        });
        
        export function formatCurrency(price: number) {
          return CURRENCY_FORMATTER.format(price);
        }
        
        ```
    
    6. ##### card组件中使用格式化价格的方法
    
        ```tsx
        ...
        <Card.Body className="d-flex flex-column ">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                  <span className="fs-2">{name}</span>
                  <span className="ms-3 text-muted">{formatCurrency(price)}</span>
                </Card.Title>
              </Card.Body>
        ...
        ```
    
    7. ##### 添加增减功能模块，格局cart中数量的值决定显示不同的内容
    
        ```tsx
        <Card.Body className="d-flex flex-column ">
                {/* 名称和价格 */}
             	 ...
                {/* 增删功能 */}
                <div>
                  {/*   格局商品数量，显示不同的按钮和内容 */}
                  {quantity === 0 ? (
                    <Button className="mt-auto w-100">+ Add to Cart</Button>
                  ) : (
                    <div
                      className="d-flex flex-column justify-content-center align-items-center"
                      style={{ gap: "0.5rem" }}
                    >
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ gap: "1rem" }}
                      >
                        <Button>-</Button>
                        <div>
                          <span className="fs-2 text-success me-2">{quantity}</span>
                          <span className="text-muted">in Cart</span>
                        </div>
                        <Button>+</Button>
                      </div>
                      <Button variant="danger">Remove</Button>
                    </div>
                  )}
                </div>
              </Card.Body>
        ```
    
    8. ##### 创建增删功能的函数，并添加到对应的按钮中
    
        ```
        ```
    
        

### 业务逻辑部分：

#### 商品列表的增删查：数据通信使用useContext钩子

1. #### 封装单独的函数组件，集成所有在商品列表组件中需要操作的功能模块

    




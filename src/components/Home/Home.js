import React, { useEffect, useState } from "react";
import { db, storage } from "../../firebase-confic";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  TextField,
} from "@mui/material";
import { getDownloadURL, uploadBytes, ref as refss } from "firebase/storage";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import UpdateIcon from "@mui/icons-material/Update";
import EditIcon from '@mui/icons-material/Edit';
import { Box } from "@mui/system";

let newid;
function Home() {
  const [category, setCategory] = useState("");
  const [discription, setDiscription] = useState("");
  const [item_name, seitemName] = useState("");
  const [quantity, setQantity] = useState(0);
  const [image, setImage] = useState(null);
  const [imgname, setimgName] = useState("");
  const [price, setPrice] = useState("");
  

  const [upcategory, upsetCategory] = useState("");
  const [updiscription, upsetDiscription] = useState("");
  const [upitem_name, upseitemName] = useState("");
  const [upquantity, upsetQantity] = useState(0);

  const handleClickOpen = (id) => {
    newid = id;
    setOpen(true);
  };

  console.log(updiscription);

  const updateData = async () => {
    const newFields = {};
    if (upcategory) {
      newFields.category = upcategory;
    }

    if (updiscription) {
      newFields.description = updiscription;
    }

    if (upitem_name) {
      newFields.name = upitem_name;
    }

    if (upquantity) {
      newFields.qantity = upquantity;
    }

    // const userDoc = doc(db, "users", newid);

    // await updateDoc(userDoc, newFields);
    const userDoc = ref(db, "products/" + newid);
    update(userDoc, newFields);
  };

  const [data, getData] = useState([]);
  const [getdatasbills, setdataBills] = useState([]);
  // const usersCollectionRef = collection(db, "products");

  useEffect(() => {
    const getDatas = async () => {
      //   const data = await getDocs(usersCollectionRef);
      //console.log(data);
      const starCountRef = ref(db, "products/");
      onValue(starCountRef, (snapshot) => {
        getData([]);
        const data = snapshot.val();
        if (data !== null) {
          Object.values(data).map((item) => {
            getData((oldArray) => [...oldArray, item]);
          });
        }
      });
    };

    const getDatasbills = async () => {
      //   const data = await getDocs(usersCollectionRef);
      //console.log(data);
      const starCountRef = ref(db, "bills/");
      onValue(starCountRef, (snapshot) => {
        setdataBills([]);
        const data = snapshot.val();
        if (data !== null) {
          Object.values(data).map((item) => {
            setdataBills((oldArray) => [...oldArray, item]);
          });
        }
      });
    };

    getDatas();
    getDatasbills();
    // getDatabill();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const addData = async () => {
    const uuid = uid();
    set(ref(db, "products/" + uuid), {
      category: category,
      description: discription,
      name: item_name,
      qantity: quantity,
      img: imgname,
      price: price,
      uuid: uuid,
    });
  };

  const deleteData = async (id) => {
    const userDoc = ref(db, "products/" + id.uuid);

    remove(userDoc);

    // console.log(userDoc)
  };

  const [open, setOpen] = React.useState(false);
  const [pro, setPro] = useState(false);

  const uploadImage = () => {
    
    if (image == null) {
      return;
    }
    setPro(true);
    const imageRef = refss(storage, image.name);
    uploadBytes(imageRef, image).then((response) => {
      console.log(response);

      getDownloadURL(imageRef).then((url) => {
        setimgName(url);
        console.log(url);
        setPro(false);
      });
    });
  };

  return (
    <div>
      {/* Prineth added user profile - start*/}

      <div className="mx-20">
        <h3
          className="text-lg font-medium leading-6 text-gray-900 mt-10 "
          style={{ textAlign: "center" }}
        >
          ADD NEW ITEM
        </h3>
        <div className="md:grid md:grid-cols-3 md:gap-6 my-10">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900"></h3>
              <img src="https://i.ibb.co/kqpmX4J/Group-35.png" alt="dc" />
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Select Category
                      </label>
                      <select
                        id="country"
                        name="country"
                        onChange={(event) => {
                          setCategory(event.target.value);
                        }}
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Item Name
                  </label>
                  <input
                    type="text"
                    style={{ width: "66%" }}
                    onChange={(event) => {
                      seitemName(event.target.value);
                    }}
                    className="
                              form-control
                              block
                              
                              mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                            "
                    id="exampleText0"
                  />
                </div>

                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    onChange={(event) => {
                      setDiscription(event.target.value);
                    }}
                    type="text"
                    style={{ width: "66%" }}
                    className="
                               form-control
                               block
                               
                               mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                             "
                    id="exampleText0"
                  />
                </div>

                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Quantity
                  </label>
                  <input
                    onChange={(event) => {
                      setQantity(event.target.value);
                    }}
                    type="number"
                    style={{ width: "66%" }}
                    className="
                              form-control
                              block
                              
                              mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                            "
                    id="exampleText0"
                    placeholder="input value"
                  />
                </div>

                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    price
                  </label>
                  <input
                    onChange={(event) => {
                      setPrice(event.target.value);
                    }}
                    type="number"
                    style={{ width: "66%" }}
                    className="
                              form-control
                              block
                              
                              mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                            "
                    id="exampleText0"
                    placeholder="input value"
                  />
                </div>

                <div>
                  <input
                    onChange={(event) => {
                      setImage(event.target.files[0]);
                    }}
                    type="file"
                    style={{ width: "66%" }}
                    className="
                              form-control
                              block
                              
                              mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                            "
                    id="exampleText0"
                    placeholder="input value"
                  />
                  { pro && (  
                    <Box sx={{ width: '65%' }}>
      <LinearProgress />
    </Box>  )}

                  <div className="mt-1 flex items-center">
                    <button
                      onClick={uploadImage}
                      type="button"
                      className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Upload
                    </button>
                  
                  </div>
                  
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <Button
                    onClick={addData}
                    style={{ backgroundColor:"#8D3527",color:"white" }}
                    
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <h1 style={{ fontSize: "25px", textAlign: "center" }}>
          Inventory Table
        </h1>
        <br />
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Category
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Description
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Item Name
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Image
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Quantity
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Price
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Setting
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((datas) => {
              return (
                <>
                  <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                      {datas.category}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                      {datas.description}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Status
                      </span>
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                      {datas.name}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Status
                      </span>
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                      <img
                        src={datas.img}
                        alt="img"
                        width="50px"
                        height="50px"
                      />
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Status
                      </span>
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                      {datas.qantity}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Status
                      </span>
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                      {datas.price}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Actions
                      </span>

                      <Button
                        variant="contained"
                        
                        endIcon={<EditIcon/>}
                        onClick={() => {
                          handleClickOpen(datas.uuid);
                        }}   
                        style={{marginBottom:"20px" , width:"100px"}}
                        size="small"
                      >
                        Edit
                      </Button>

                      

                      <div>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          overlayStyle={{ backgroundColor: "transparent" }}
                        >
                          <DialogTitle>Subscribe</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              To subscribe to this website, please enter your
                              email address here. We will send updates
                              occasionally.
                            </DialogContentText>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label="category"
                              type="text"
                              fullWidth
                              variant="standard"
                              onChange={(event) => {
                                upsetCategory(event.target.value);
                              }}
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label="description"
                              type="text"
                              fullWidth
                              variant="standard"
                              onChange={(event) => {
                                upsetDiscription(event.target.value);
                              }}
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label="item_name"
                              type="text"
                              fullWidth
                              variant="standard"
                              onChange={(event) => {
                                upseitemName(event.target.value);
                              }}
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label="Quantity"
                              type="number"
                              fullWidth
                              variant="standard"
                              onChange={(event) => {
                                upsetQantity(event.target.value);
                              }}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={updateData}>Update</Button>
                          </DialogActions>
                        </Dialog>
                      </div>

                      <Button
                        variant="contained"
                        color="error"
                        endIcon={<UpdateIcon />}
                        onClick={() => {
                          deleteData(datas);
                        }}
                        size="small"
                        style={{width:"100px"}}

                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      {/* Prineth added user profile - end*/}

      <div className="hidden sm:block" aria-hidden="true">
        <h1 style={{ fontSize: "25px", textAlign: "center" }}>Bill Table</h1>
        <br />
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                address
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                amount
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                email
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                price
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Quantity
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                tittle
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                username
              </th>
            </tr>
          </thead>
          <tbody>
            {getdatasbills.map((datas) => {
              return (
                <>
                  <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                      {datas.address}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                      {datas.amount}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Status
                      </span>
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                      {datas.email}
                    </td>

                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Status
                      </span>
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                      {datas.price}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Status
                      </span>
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                      {datas.quantity}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Status
                      </span>
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                      {datas.title}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Status
                      </span>
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                      {datas.username}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;

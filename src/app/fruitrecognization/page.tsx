'use client';
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Layout from "../components/Layout";
import toast, { Toaster } from 'react-hot-toast';

interface FruitRecognizationProps {
    
}
 
const FruitRecognization: FC<FruitRecognizationProps> = () => {
  const [file, setFile] = useState<File>();
  const [responseImage, setResponseImage] = useState('');
  const handleUpload = async() => {
    if (file) {
        console.log('file',file)
        let fileType = file.type
        if(fileType.includes("image") || fileType.includes("video")){
          const formData = new FormData();
          formData.append('file', file);
          await fetch(`https://machine.issc.ftisu.vn/${fileType.includes("image")?"upload":"uploadvideo"}`, {
              method: 'POST',
              body: formData,
              mode: 'cors',
              headers: {
                  Accept: 'application/json',
              },
          })
          .then((response) => response.json())
          .then((data) => {
              console.log('data.value', data.value)
              setResponseImage(data.value)
            })
          .catch((error) => {
              toast.error("An error has occurred")
              console.error('Error:', error);
          });
        }
        
    }
  }
  return ( 
      <Layout>
        <Toaster />
        <div className="p-6">
            <div className="flex justify-center">
                <h1 className="text-4xl font-bold">Fruit Recognization</h1>
            </div>
            <div className="mt-10">
              <div className=" h-[80vh] w-full sm:px-8 md:px-16 sm:py-8">
                <main className="container mx-auto max-w-full-lg h-full">
                  <article aria-label="File Upload Modal" className="relative h-full flex flex-col bg-white shadow-xl rounded-md">

                    <section className="h-full overflow-auto p-8 w-full flex flex-col">
                      <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                        <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                          {file?
                            <span>{file.name}</span>
                          :
                            <>
                            <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
                            </>
                          }
                        </p>
                        <input id="hidden-input" type="file" multiple className="hidden" 
                              onChange={e => {
                              setFile(e.target.files![0]);
                              console.log(e.target.files![0])
                            }}/>
                        <label  id="button" htmlFor="hidden-input" className="mt-2 rounded-sm px-6 py-4 cursor-pointer bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                          Upload a file
                        </label >
                      </header>
                      <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                        To Upload
                      </h1>
                      {
                        responseImage !== ''?
                        <ul className="flex flex-1 flex-wrap -m-1">
                          <li className="h-full w-full text-center flex flex-col justify-center items-center">
                            <img className="mx-auto" src={responseImage}/>
                          </li>
                        </ul>
                        :
                        <ul className="flex flex-1 flex-wrap -m-1">
                          <li className="h-full w-full text-center flex flex-col justify-center items-center">
                            <img className="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
                            <span className="text-small text-gray-500">No files selected</span>
                          </li>
                        </ul>
                      }

                    </section>

                    <footer className="flex justify-center px-8 pb-8 pt-4">
                      <button onClick={()=>handleUpload()} className=" px-10 py-6 rounded-lg bg-[#726BDF] hover:bg-[#645ebd] text-white font-semibold focus:shadow-outline focus:outline-none">
                        Recognize
                      </button>
                    </footer>
                  </article>
                </main>
              </div>
            </div>
        </div>
      </Layout>
  );
}
 
export default FruitRecognization;
import React, { useEffect, useState, useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import { useDropzone } from 'react-dropzone'
import { FaUpload } from 'react-icons/fa'
import {observer} from 'mobx-react-lite'
import { createContext } from 'react'
import { useCallback } from 'react'
import { makeAutoObservable, action, makeObservable, observable } from 'mobx'
import ImageUploading from 'react-images-uploading'
import { nftNaddress } from './mobx/Classes'

/* export const NftImageContext = createContext(); */
/* const imageObserver = observer(image); */
/* export let iimage = () => {
    //
} */
/* export let image;
makeAutoObservable(image); */
const Dropzone = () => {
    const [images, setImages] = React.useState([]);
    const [walletAddresses, setWalletAddresses] = React.useState([]);
    const maxNumber = 1;

    const { currentBase, setCurrentBase,handleSubmission } = useContext(TransactionContext);

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        //console.log(imageList, addUpdateIndex);
        setImages(imageList);
        console.log(imageList);
        //onUpload();
      };
    /* useEffect(action(()=>{
        if(images.length) {
            let obj = {}
            let res = images[images.length-1]['data_url']
            obj['address'] = res
            image = obj;
            console.log(obj)
             observableImages.imagg.push = obj;
             image = observableImages;
             image.push(res)  image.wallet.push(obj)
             console.log(image.wallet) 
        }
    })) */
    /* class ObservableImages {
        imagg = [{}];
        constructor() {
            makeObservable(this, {
                imagg: observable
            })
        }
    }
    const observableImages = new ObservableImages()
 */
    useEffect(() => {
        if(images.length) {
            //let path = images[images.length-1]['data_url']
            let path = images[images.length-1]['file']
            //setCurrentBase(path)
            //console.log(path2)
            //let addr = '0xadsadsad'
            //nftNaddress.setNftToAddress(addr,path)
            //console.log(nftNaddress.nftToAddress)
            console.log(images)
            console.log(currentBase)
            handleSubmission(path)
        }
    },[images]);
    const onUpload = () => {
        let path = images[images.length-1]['data_url']
        console.log(path)
        let addr = '0xadsadsad'
        nftNaddress.setNftToAddress(addr,path)
    }
    return (
            <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
                }) => (    
            <div className='flex flex-col place-items-center place-content-center h-40 w-10/12 border border-dotted border-2 rounded-sm border-black hover:border-sky-600'
            onClick={() => {onImageUpload(); onImageUpdate(0);}}
            //onDrop={() => {console.log(images[images.length-1]['data_url']) //here we filled image export variable with path   }}
            {...dragProps}
            >
            {/* <div className='w-full h-full' onClick={onImageUpload}
            {...dragProps}
            > */}
                <FaUpload className='h-7 w-7 mb-2'/>
                <p>Drop your NFT image here or click to upload</p>
                {/* <p>{image.source}</p> */}
                {imageList.map((image, index) => (
                    <div key={index} className='h-10 w-10'>
                        <img src={image['data_url']} alt="" width={'w-full'} height={'h-full'} />
                    </div>
                ))}
                
            {/* </div> */}
            </div>
        )}
        
        </ImageUploading>
        
    )
}

export default Dropzone

/* const Dropzone = ({onDrop, accept }) => {
    const [img, setImg] = useState(
        
    )
    const { acceptedFiles,getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept
        });
    /* useEffect(action(() =>{
        if(acceptedFiles.length) {
            image.source = URL.createObjectURL(acceptedFiles[0])
        }    
    })) 
    const imageRoute = (action((acceptedFiles) => {
        console.log(acceptedFiles[0].path),
        setImg(acceptedFiles[0].path)
    }
        
    )) */
    /* const imagePath = (acceptedFiles => (
        image = acceptedFiles[0].path
    )) */
   /*  return (
        <div className='flex flex-col place-items-center place-content-center h-40 w-10/12 border border-dotted border-2 rounded-sm border-black hover:border-sky-600'
            {...getRootProps()} onClick={imageRoute}>
            <input {...getInputProps()} />
            <FaUpload className='h-7 w-7 mb-2'/>
            <p>Drop your NFT image here or click to upload</p>
            <p>{image.source}</p>
            {/* <NftImageContext.Provider value={image}>
                {children}
            </NftImageContext.Provider> }¸
            <img src={img} style={{width:'100px', height:'100px'}} />
        </div>
        
    )
}
 */
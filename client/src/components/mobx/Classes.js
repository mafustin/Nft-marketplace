class NftnAddressess {
    nftToAddress=[];
    getNfts() {
        return nftToAddress;
    }
    autorun = () => console.log(this.nftToAddress);
    setNftToAddress = (addr, path) => {
        let address = addr
        let obj = {[address]:path}
        this.nftToAddress.push(obj);
    }
}

export const nftNaddress = new NftnAddressess();
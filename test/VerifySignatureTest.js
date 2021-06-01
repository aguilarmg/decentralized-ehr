const { expect } = require("chai");

describe("Signature verification test", function () {
    async function setup() {
        const [owner, addr1] = await ethers.getSigners();
        const VerifySignature = await ethers.getContractFactory(
            "VerifySignature"
        );
        const contractInst = await VerifySignature.deploy();
        return { owner, addr1, contractInst };
    }

    it("Testing signature verification given a signature that was created off-chain.", async function () {
        const { owner, addr1, contractInst } = await setup();
        let msg = "I approve this update.";
        // keccak256 wants an array of numbers, a data hex string,
        // or a Uint8Array, so convert string to bytes first.
        const msgUint8 = ethers.utils.toUtf8Bytes(msg);
        const msgHash = ethers.utils.keccak256(msgUint8);
        const rawSignature = await owner.signMessage(msg);
        const signature = ethers.utils.splitSignature(rawSignature);
        console.log("rawSignature: ", rawSignature);
        console.log("signature: ", signature);
        console.log("msgHash: ", msgHash);
        console.log("ownerAddress: ", owner.address);
        console.log("\n");
        await contractInst.verifySignature(
            owner.address,
            msgHash,
            signature["v"],
            signature["r"],
            signature["s"]
        );
    });
});

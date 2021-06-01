pragma solidity ^0.7.3;

import "hardhat/console.sol";

contract VerifySignature {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    function _recoverSigner(
        bytes32 hash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal view returns (address) {
        console.logBytes32(hash);
        console.logUint(v);
        console.logBytes32(r);
        console.logBytes32(s);
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, hash));
        console.logBytes32(prefixedHash);
        return ecrecover(prefixedHash, v, r, s);
    }

    function verifySignature(
        address _signer,
        bytes32 _hash,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) external {
        address signer = _recoverSigner(_hash, _v, _r, _s);
        console.logAddress(_signer);
        console.logAddress(signer);
        require(_signer == signer, "This is an invalid signature.");
    }
}

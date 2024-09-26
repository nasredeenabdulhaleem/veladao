import { Connection, PublicKey } from '@solana/web3.js';
import { Provider, web3 } from '@project-serum/anchor';
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';

class CrowdfundClient {
    constructor(connection, wallet) {
        this.connection = connection;
        this.wallet = wallet;
        this.provider = new Provider(connection, wallet, Provider.defaultOptions());
    }

    async initializeProject(name, description, targetAmount, milestones) {
        const response = await fetch('/initialize-project', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description, targetAmount, milestones }),
        });
        return await response.json();
    }

    async donate(projectId, amount) {
        const donorTokenAccount = await getOrCreateAssociatedTokenAccount(
            this.connection,
            this.wallet.payer,
      /* USDC_MINT_ADDRESS */,
        this.wallet.publicKey
    );

        const response = await fetch('/donate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                projectId,
                amount,
                donorPublicKey: this.wallet.publicKey.toString(),
                donorTokenAccount: donorTokenAccount.address.toString(),
            }),
        });
        return await response.json();
    }

    // Add other methods as needed
}

export default CrowdfundClient;
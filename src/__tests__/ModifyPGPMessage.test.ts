import EncryptHelper from '../EncryptHelper';

describe('Should correctly modify PGP message', () => {
    test('Modify PGP message', () => {
        const pgpMsg = `-----BEGIN PGP MESSAGE-----

        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
        XtUl+5VdavIS0JGHf4A=
        =dkmd
        -----END PGP MESSAGE-----`;

        const modified = EncryptHelper.modifyPGPMessage(pgpMsg);
        console.log(modified);
    });
});

import React from "react";
import { Modal, ModalClose, ModalDialog, DialogTitle, DialogContent } from '@mui/joy';

const FormPreview = ({ handleCloseLayout, layout }) => {
    return (
        <React.Fragment>
            <Modal open={!!layout} onClose={() => handleCloseLayout(undefined)}>
                <ModalDialog layout={layout}>
                    <ModalClose />
                    <DialogTitle>Modal Dialog</DialogTitle>
                    <DialogContent>
                        <div>
                            This is a <code>{layout}</code> modal dialog. Press <code>esc</code> to
                            close it.
                        </div>
                    </DialogContent>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    )
}

export default FormPreview;
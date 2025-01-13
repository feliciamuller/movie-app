import { Box, Modal, Typography } from '@mui/material';
import { Movie } from '../../Models/Movie';

type DescriptionModalProps = {
  modalOpen: boolean;
  setModalClosed: (arg: boolean) => void;
  selected: Movie | undefined | null;
};

export default function DescriptionModal(props: DescriptionModalProps) {
  const { modalOpen, setModalClosed, selected } = props;

  return (
    <Modal open={modalOpen} onClose={setModalClosed}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.dark',
          padding: 4,
          textAlign: 'center',
          borderRadius: '8px',
        }}
      >
        {selected && (
          <>
            <Typography variant='h6' component='h2'>
              {selected.title}
            </Typography>
            <Typography sx={{ mt: 2 }}>{selected.overview}</Typography>
          </>
        )}
      </Box>
    </Modal>
  );
}
